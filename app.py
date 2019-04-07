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
percentile_keys = ["Min","25th Percentile", "50th Percentile", "75th Percentile", "Mean","Max"]

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
    min_price = listings_data_grouped["price"].min()
    quartile_1_price = listings_data_grouped["price"].quantile(q=0.25)
    quartile_2_price = listings_data_grouped["price"].quantile(q=0.5)
    quartile_3_price = listings_data_grouped["price"].quantile(q=0.75)
    mean_price = listings_data_grouped["price"].mean()
    max_price = listings_data_grouped["price"].max()
    summary_prices = [min_price,quartile_1_price,quartile_2_price,quartile_3_price,mean_price,max_price]
    summary_prices_dictionary = dict(zip(percentile_keys,summary_prices))
    return jsonify(summary_prices_dictionary)

@app.route("/bedroomssummary/<neighborhood>")
def bedroomssummary(neighborhood):
    listings_data_2 = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped_2 = listings_data_2.loc[(listings_data_2["neighbourhood_group_cleansed"]== neighborhood),:]
    min_bedrooms = listings_data_grouped_2["bedrooms"].min()
    quartile_1_bedrooms = listings_data_grouped_2["bedrooms"].quantile(q=0.25)
    quartile_2_bedrooms = listings_data_grouped_2["bedrooms"].quantile(q=0.5)
    quartile_3_bedrooms = listings_data_grouped_2["bedrooms"].quantile(q=0.75)
    mean_bedrooms = listings_data_grouped_2["bedrooms"].mean()
    max_bedrooms = listings_data_grouped_2["bedrooms"].max()
    summary_bedrooms = [min_bedrooms,quartile_1_bedrooms,quartile_2_bedrooms,quartile_3_bedrooms,mean_bedrooms,max_bedrooms]
    summary_bedrooms_dictionary = dict(zip(percentile_keys,summary_bedrooms))
    return jsonify(summary_bedrooms_dictionary)

@app.route("/bathroomssummary/<neighborhood>")
def bathroomssummary(neighborhood):
    listings_data_3 = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped_3 = listings_data_3.loc[(listings_data_3["neighbourhood_group_cleansed"]== neighborhood),:]
    min_bathrooms = listings_data_grouped_3["bathrooms"].min()
    quartile_1_bathrooms = listings_data_grouped_3["bathrooms"].quantile(q=0.25)
    quartile_2_bathrooms = listings_data_grouped_3["bathrooms"].quantile(q=0.5)
    quartile_3_bathrooms = listings_data_grouped_3["bathrooms"].quantile(q=0.75)
    mean_bathrooms = listings_data_grouped_3["bathrooms"].mean()
    max_bathrooms = listings_data_grouped_3["bathrooms"].max()
    summary_bathrooms = [min_bathrooms,quartile_1_bathrooms,quartile_2_bathrooms,quartile_3_bathrooms,mean_bathrooms,max_bathrooms]
    summary_bathrooms_dictionary = dict(zip(percentile_keys,summary_bathrooms))
    return jsonify(summary_bathrooms_dictionary)

@app.route("/pricelist/<neighborhood>")
def pricelist(neighborhood):
    listings_data_4 = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped_4 = listings_data_4.loc[(listings_data_4["neighbourhood_group_cleansed"] == neighborhood),:]
    return jsonify(listings_data_grouped_4["price"].tolist())

@app.route("/reviewscorelist/<neighborhood>")
def reviewscorelist(neighborhood):
    listings_data_5 = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped_5 = listings_data_5.loc[(listings_data_5["neighbourhood_group_cleansed"] == neighborhood),:]
    return jsonify(listings_data_grouped_5["review_scores_rating"].tolist())

@app.route("/propertytype/<neighborhood>")
def property_type(neighborhood):
    listings_data_6 = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped_6 = listings_data_6.loc[(listings_data_6["neighbourhood_group_cleansed"] == neighborhood),:]
    property_type_dictionary = listings_data_grouped_6["property_type"].value_counts().to_dict()
    return jsonify(property_type_dictionary)

@app.route("/roomtype/<neighborhood>")
def room_type(neighborhood):
    listings_data_7 = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped_7 = listings_data_7.loc[(listings_data_7["neighbourhood_group_cleansed"] == neighborhood),:]
    room_type_dictionary = listings_data_grouped_7["room_type"].value_counts().to_dict()
    return jsonify(room_type_dictionary)

@app.route("/cancellationpolicy/<neighborhood>")
def cancellation_policy(neighborhood):
    listings_data_8 = pd.read_sql("SELECT * FROM listings",engine)
    listings_data_grouped_8 = listings_data_8.loc[(listings_data_8["neighbourhood_group_cleansed"] == neighborhood),:]
    cancellation_policy_dictionary = listings_data_grouped_8["cancellation_policy"].value_counts().to_dict()
    return jsonify(cancellation_policy_dictionary)

# @app.route("/reviewcontentlist/<neighborhood>")
# def reviewcontentlist(neighborhood):
#     reviews_content_data = pd.read_sql("SELECT * FROM property_reviews LEFT JOIN listings ON property_reviews.listing_id = listings.id",engine)
#     reviews_content_data_grouped = reviews_content_data.loc[(reviews_content_data["neighbourhood_group_cleansed"] == neighborhood),:]
#     return jsonify(reviews_content_data_grouped["comments"].tolist())

if __name__ == "__main__":
    app.run()
