import unittest
from unittest.mock import patch, MagicMock
import fetch_and_prompt

class AcceptanceTestFetchAndPrompt(unittest.TestCase):
    @patch('fetch_and_prompt.requests.get')
    @patch('fetch_and_prompt.fastf1.get_session')
    def test_full_flow(self, mock_get_session, mock_get):
        # Mock API responses
        mock_driver_resp = MagicMock()
        mock_driver_resp.json.return_value = {'driver': 'acceptance_driver'}
        mock_constructor_resp = MagicMock()
        mock_constructor_resp.json.return_value = {'constructor': 'acceptance_constructor'}
        mock_get.side_effect = [mock_driver_resp, mock_constructor_resp]

        # Mock FastF1 sessions
        mock_session = MagicMock()
        mock_session.load.return_value = None
        mock_get_session.return_value = mock_session

        # Fetch fantasy data
        driver_json, constructor_json = fetch_and_prompt.fetch_fantasy_data()
        self.assertEqual(driver_json, {'driver': 'acceptance_driver'})
        self.assertEqual(constructor_json, {'constructor': 'acceptance_constructor'})

        # Fetch practice data
        sessions = fetch_and_prompt.fetch_recent_practice_data(2025, 1)
        self.assertIn('FP1', sessions)
        self.assertIn('FP2', sessions)
        self.assertIn('FP3', sessions)

        # Build prompt
        prompt = fetch_and_prompt.build_team_prompt(driver_json, constructor_json, sessions)
        self.assertIn('acceptance_driver', prompt)
        self.assertIn('acceptance_constructor', prompt)
        self.assertIn('FP1', prompt)
        self.assertIn('FP2', prompt)
        self.assertIn('FP3', prompt)

if __name__ == '__main__':
    unittest.main()
