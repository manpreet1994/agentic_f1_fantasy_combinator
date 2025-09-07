import unittest
from unittest.mock import patch, MagicMock
import fetch_and_prompt

class TestFetchAndPrompt(unittest.TestCase):
    @patch('fetch_and_prompt.requests.get')
    def test_fetch_fantasy_data(self, mock_get):
        # Mock driver and constructor responses
        mock_driver_resp = MagicMock()
        mock_driver_resp.json.return_value = {'driver': 'data'}
        mock_constructor_resp = MagicMock()
        mock_constructor_resp.json.return_value = {'constructor': 'data'}
        mock_get.side_effect = [mock_driver_resp, mock_constructor_resp]

        driver_json, constructor_json = fetch_and_prompt.fetch_fantasy_data()
        self.assertEqual(driver_json, {'driver': 'data'})
        self.assertEqual(constructor_json, {'constructor': 'data'})

    def test_build_team_prompt(self):
        driver_json = {'driver': 'data'}
        constructor_json = {'constructor': 'data'}
        recent_practice_data = {'FP1': 'practice1', 'FP2': 'practice2', 'FP3': 'practice3'}
        prompt = fetch_and_prompt.build_team_prompt(driver_json, constructor_json, recent_practice_data)
        self.assertIn('driver statistics', prompt)
        self.assertIn('constructor statistics', prompt)
        self.assertIn('recent practice data', prompt)
        self.assertIn('FP1', prompt)
        self.assertIn('FP2', prompt)
        self.assertIn('FP3', prompt)

    @patch('fetch_and_prompt.fastf1.get_session')
    def test_fetch_recent_practice_data(self, mock_get_session):
        # Mock session object
        mock_session = MagicMock()
        mock_session.load.return_value = None
        mock_get_session.return_value = mock_session

        sessions = fetch_and_prompt.fetch_recent_practice_data(2025, 1)
        self.assertIsInstance(sessions, dict)
        self.assertIn('FP1', sessions)
        self.assertIn('FP2', sessions)
        self.assertIn('FP3', sessions)
        self.assertIs(sessions['FP1'], mock_session)
        self.assertIs(sessions['FP2'], mock_session)
        self.assertIs(sessions['FP3'], mock_session)

if __name__ == '__main__':
    unittest.main()
