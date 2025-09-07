import os

# config for f1 website
driver_code_to_driver_mapping = {
    "ALB": "wil_driver_1",
    "SAI": "wil_driver_2",
    "VER": "red_driver_1",
    "TSU": "red_driver_2",
    "HAM": "fer_driver_2",
    "LEC": "fer_driver_1",
    "RUS": "mer_driver_2",
    "NOR": "mcl_driver_1",
    "ANT": "mer_driver_1",
    "PIA": "mcl_driver_2",
    "ALO": "ast_driver_1",
    "STR": "ast_driver_2",
    "BOR": "kck_driver_2",
    "BEA": "haa_driver_2",
    "HAD": "vrb_driver_2", 
    "LAW": "vrb_driver_1",  
    "OCO": "haa_driver_1", 
    "DOO": "alp_driver_2",
    "GAS": "alp_driver_1",
    "HUL": "kck_driver_1",
}

substitute_drivers = {
    "HIR": {"japan":"alp_driver_2", "bahrain":"haa_driver_2"},
    "BRO": {"bahrain": "wil_driver_2"},
    "BEG": {"bahrain": "fer_driver_1"},
    "DRU": {"bahrain": "ast_driver_1"},
    "VES": {"bahrain": "mer_driver_2"},
    "IWA": {"bahrain": "red_driver_1"},
}

all_races = [
    "bahrain",
    "saudi-arabia",
    "australia",
    "japan",
    "china",
    "miami",
    "emilia-romagna",
    "monaco",
    "canada",
    "spain",
    "austria",
    "great-britain",
    "hungary",
    "belgium",
    "netherlands",
    "italy",
    "azerbaijan",
    "singapore",
    "united-states",
    "mexico",
    "brazil",
    "las-vegas",
    "qatar",
    "abu-dhabi",
]

#config for fantasy toolsdriver_code_to_driver_mapping = 
fantasy_tools_driver_code_to_driver_mapping ={
    "ALB": "wil_driver_1",
    "SAI": "wil_driver_2",
    "VER": "red_driver_1",
    "LAW": "red_driver_2",
    "HAM": "fer_driver_2",
    "LEC": "fer_driver_1",
    "RUS": "mer_driver_2",
    "ANT": "mer_driver_1",
    "NOR": "mcl_driver_1",
    "PIA": "mcl_driver_2",
    "ALO": "ast_driver_1",
    "STR": "ast_driver_2",
    "TSU": "vrb_driver_1",
    "HAD": "vrb_driver_2",   
    "OCO": "haa_driver_1", 
    "BEA": "haa_driver_2",
    "GAS": "alp_driver_1",
    "DOO": "alp_driver_2",
    "HUL": "kck_driver_1",
    "BOR": "kck_driver_2",
}

constructor_code_to_name = {
    "fer" : "Ferrari",
    "ast" : "Aston",
    "mer": "Mercedes",
    "mcl": "Mclaren",
    "wil" : "William",
    "vrb" : "Racing bulls",
    "kck" : "Sauber",
    "alp": "Alpine",
    "haa" : "Haas",
    "red" : "Redbull"
}
UI_NAME_DICT = {**{v:k for k,v in driver_code_to_driver_mapping.items()}, **constructor_code_to_name}

#model considerations
MODEL_TYPE = "rf"
FEATURE_SET = ['fp1', 'fp2', 'fp3', 'avg_score', 'dnf_prob', 'dotd_prob', "weighted_fp_mean"]

F1_FANTASY_DRIVER_URL = "https://f1fantasytools.com/api/statistics/2025"
F1_FANTASY_CONSTRUCTOR_URL = "https://f1fantasytools.com/api/statistics/2025"

YEAR_OF_USAGE = "2025"
DRIVER_DATA_PATH = os.path.join("data_collection", "data", YEAR_OF_USAGE, "driver")
TEAM_DATA_PATH = os.path.join("data_collection", "data", YEAR_OF_USAGE, "constructor")
MODEL_PATH = os.path.join("model_training", "model", YEAR_OF_USAGE)
PREDICTION_PATH = os.path.join("model_training", "predictions", YEAR_OF_USAGE)
PREDICTION_HTML_PATH = os.path.join("webpages", "prediction_pages", YEAR_OF_USAGE)

DOMINANT_DRIVERS = ["red_driver_1", "red_driver_2", "mcl_driver_1", "mcl_driver_2", "fer_driver_1", "fer_driver_2", "mer_driver_1", "mer_driver_2"]
DOMINANT_TEAMS = ["red", "merc", "mcl", "fer"]