import os
import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,inspect

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)



#################################################
# Database Setup
#################################################
# engine = create_engine("sqlite:///db/output/airbnb_data.sqlite")
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/airbnb_data.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

engine = create_engine("sqlite:///db/airbnb_data.sqlite", encoding='utf8')
conn = engine.connect()
session = Session(engine)


# Save references to each table
# Listings = Base.classes.listings
# Hosts =  Base.classes.airbnb_hosts
# Reviews =  Base.classes.property_reviews


# PART 3 -- FLASK SETUP AND ROUTE CREATION

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/neighborhoods")
def neighborhoods():
    neighborhoods = pd.read_sql("SELECT neighbourhood_group_cleansed FROM listings",engine)
    neighborhoods_list = neighborhoods['neighbourhood_group_cleansed'].unique()
    return jsonify(neighborhoods_list.tolist())

@app.route("/pricesummary/<neighborhood>")
def pricesummary(neighborhood):
    listings_data = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped = listings_data.loc[(listings_data["neighbourhood_group_cleansed"]== neighborhood),:]
    mean_price = listings_data_grouped["price"].mean()
    quartile_1_price = listings_data_grouped["price"].quantile(q=0.25)
    quartile_2_price = listings_data_grouped["price"].quantile(q=0.5)
    quartile_3_price = listings_data_grouped["price"].quantile(q=0.75)
    summary_prices = [quartile_1_price,quartile_2_price,quartile_3_price,mean_price]
    return jsonify(summary_prices)

@app.route("/bedroomssummary/<neighborhood>")
def bedroomssummary(neighborhood):
    listings_data = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped = listings_data.loc[(listings_data["neighbourhood_group_cleansed"] == neighborhood),:]
    mean_bedrooms = listings_data_grouped["bedrooms"].mean()
    quartile_1_bedrooms = listings_data_grouped["bedrooms"].quantile(q=0.25)
    quartile_2_bedrooms = listings_data_grouped["bedrooms"].quantile(q=0.5)
    quartile_3_bedrooms = listings_data_grouped["bedrooms"].quantile(q=0.75)
    summary_bedrooms = [quartile_1_bedrooms,quartile_2_bedrooms,quartile_3_bedrooms,mean_bedrooms]
    return jsonify(summary_bedrooms)

# @app.route("/bathroomssummary/<neighborhood>")
# def bathroomssummary(neighborhood):
#     listings_data = pd.read_sql("SELECT * FROM listings",engine)
#     listings_data_grouped = listings_data.loc[(listings_data["neighbourhood_group_cleansed"]== neighborhood),:]
#     mean_bathrooms = listings_data_grouped["bathrooms"].mean()
#     quartile_1_bathrooms = listings_data_grouped["bathrooms"].quantile(q=0.25)
#     quartile_2_bathrooms = listings_data_grouped["bathrooms"].quantile(q=0.5)
#     quartile_3_bathrooms = listings_data_grouped["bathrooms"].quantile(q=0.75)
#     summary_bathrooms = [quartile_1_bathrooms,quartile_2_bathrooms,quartile_3_bathrooms,mean_bathrooms]
#     return jsonify(summary_bathrooms)



if __name__ == "__main__":
    app.run()
