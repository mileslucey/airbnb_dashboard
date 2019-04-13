# Import dependencies
import os
import pandas as pd
import numpy as np
import sqlalchemy
import math
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine,inspect
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

# Define the app as a flask app
app = Flask(__name__)

#################################################
# Database Setup
#################################################
# Identify the database path
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/airbnb_data.sqlite"
# Make it so that it doesn't track modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Define database as SQLALCHEMY of the flask app
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Define the engine
engine = create_engine("sqlite:///db/airbnb_data.sqlite", encoding='utf8')
conn = engine.connect()
session = Session(engine)

# Define the percentile keys that will be used later on (list of strings)
percentile_keys = ["Min","25th Percentile", "50th Percentile", "75th Percentile", "Mean","Max"]

# ROUTE CREATION

# Define the home
@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

# Define the route to "/neighborhoods"
@app.route("/neighborhoods")
def neighborhoods():
    # Run a query to find all unique neighborhoods and return a list of those neighborhoods
    neighborhoods = pd.read_sql("SELECT neighbourhood_group_cleansed FROM listings",engine)
    neighborhoods_list = neighborhoods['neighbourhood_group_cleansed'].unique()    
    return jsonify(neighborhoods_list.tolist())

# Define the route to "/pricesummary/<neighborhood>"
@app.route("/pricesummary/<neighborhood>")
def pricesummary(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database
    listings_data = pd.read_sql("SELECT * FROM listings",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped = listings_data.loc[(listings_data["neighbourhood_group_cleansed"]== neighborhood),:]
    # Calculate min, 25th percentile, 50th percentile, 75th percentile, mean, and max prices
    min_price = listings_data_grouped["price"].min()
    quartile_1_price = listings_data_grouped["price"].quantile(q=0.25)
    quartile_2_price = listings_data_grouped["price"].quantile(q=0.5)
    quartile_3_price = listings_data_grouped["price"].quantile(q=0.75)
    mean_price = round(listings_data_grouped["price"].mean(),2)
    max_price = listings_data_grouped["price"].max()
    # Put all prices into a list
    summary_prices = [min_price,quartile_1_price,quartile_2_price,quartile_3_price,mean_price,max_price]
    # Zip prices with their labels
    summary_prices_dictionary = dict(zip(percentile_keys,summary_prices))
    # Put the resulting dictionary into JSON format and return it
    return jsonify(summary_prices_dictionary)

# Define the route to "/bedroomssummary/<neighborhood>"
@app.route("/bedroomssummary/<neighborhood>")
def bedroomssummary(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database
    listings_data_2 = pd.read_sql("SELECT * FROM listings",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped_2 = listings_data_2.loc[(listings_data_2["neighbourhood_group_cleansed"]== neighborhood),:]
    # Calculate min, 25th percentile, 50th percentile, 75th percentile, mean, and max bedrooms
    min_bedrooms = listings_data_grouped_2["bedrooms"].min()
    quartile_1_bedrooms = listings_data_grouped_2["bedrooms"].quantile(q=0.25)
    quartile_2_bedrooms = listings_data_grouped_2["bedrooms"].quantile(q=0.5)
    quartile_3_bedrooms = listings_data_grouped_2["bedrooms"].quantile(q=0.75)
    mean_bedrooms = round(listings_data_grouped_2["bedrooms"].mean(),1)
    max_bedrooms = listings_data_grouped_2["bedrooms"].max()
    # Put calculated bedroom quantities into a list
    summary_bedrooms = [min_bedrooms,quartile_1_bedrooms,quartile_2_bedrooms,quartile_3_bedrooms,mean_bedrooms,max_bedrooms]
    # Zip bedroom quantities with their labels
    summary_bedrooms_dictionary = dict(zip(percentile_keys,summary_bedrooms))
    # Put the resulting dictionary into JSON format and return it
    return jsonify(summary_bedrooms_dictionary)

# Define the route to "/bathroomssummary/<neighborhood>"
@app.route("/bathroomssummary/<neighborhood>")
def bathroomssummary(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database
    listings_data_3 = pd.read_sql("SELECT * FROM listings",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped_3 = listings_data_3.loc[(listings_data_3["neighbourhood_group_cleansed"]== neighborhood),:]
    # Calculate min, 25th percentile, 50th percentile, 75th percentile, mean, and max bathrooms
    min_bathrooms = listings_data_grouped_3["bathrooms"].min()
    quartile_1_bathrooms = listings_data_grouped_3["bathrooms"].quantile(q=0.25)
    quartile_2_bathrooms = listings_data_grouped_3["bathrooms"].quantile(q=0.5)
    quartile_3_bathrooms = listings_data_grouped_3["bathrooms"].quantile(q=0.75)
    mean_bathrooms = round(listings_data_grouped_3["bathrooms"].mean(),1)
    max_bathrooms = listings_data_grouped_3["bathrooms"].max()
    # Put calculated bathroom quantities into a list
    summary_bathrooms = [min_bathrooms,quartile_1_bathrooms,quartile_2_bathrooms,quartile_3_bathrooms,mean_bathrooms,max_bathrooms]
    # Zip bathroom quantities with their labels
    summary_bathrooms_dictionary = dict(zip(percentile_keys,summary_bathrooms))
    # Put the resulting dictionary into JSON format and return it
    return jsonify(summary_bathrooms_dictionary)

# Define the route to "/pricelist/<neighborhood>"
@app.route("/pricelist/<neighborhood>")
def pricelist(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database that is less than a price of $399
    listings_data_4 = pd.read_sql("SELECT * FROM listings WHERE listings.price<399",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped_4 = listings_data_4.loc[(listings_data_4["neighbourhood_group_cleansed"] == neighborhood),:]
    # Make the price column into its own list and put the list into a JSON format
    return jsonify(listings_data_grouped_4["price"].tolist())

# Define the route to "/reviewscorelist/<neighborhood>"
@app.route("/reviewscorelist/<neighborhood>")
def reviewscorelist(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database that has a review_score_rating greater than 60
    listings_data_5 = pd.read_sql("SELECT * FROM listings WHERE listings.review_scores_rating>60",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped_5 = listings_data_5.loc[(listings_data_5["neighbourhood_group_cleansed"] == neighborhood),:]
    # Make the review scores column into its own list and put the list into a JSON format
    return jsonify(listings_data_grouped_5["review_scores_rating"].tolist())

# Define the route to "/propertytype/<neighborhood>"
@app.route("/propertytype/<neighborhood>")
def property_type(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database that has a property type of either townhouse, house, apartment, or condominium (we exclude some of the random property types)
    listings_data_6 = pd.read_sql("SELECT * FROM listings WHERE listings.property_type IN ('Townhouse','House','Apartment','Condominium')",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped_6 = listings_data_6.loc[(listings_data_6["neighbourhood_group_cleansed"] == neighborhood),:]
    # Put the property types and the counts of each into a dictionary
    property_type_dictionary = listings_data_grouped_6["property_type"].value_counts().to_dict()
    # Return the JSONified dictionary
    return jsonify(property_type_dictionary)

# Define the route to "/roomtype/<neighborhood>"
@app.route("/roomtype/<neighborhood>")
def room_type(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database
    listings_data_7 = pd.read_sql("SELECT * FROM listings",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped_7 = listings_data_7.loc[(listings_data_7["neighbourhood_group_cleansed"] == neighborhood),:]
    # Put the room types and the counts of each into a dictionary
    room_type_dictionary = listings_data_grouped_7["room_type"].value_counts().to_dict()
    # Return the JSONified dictionary
    return jsonify(room_type_dictionary)

# Define the route to "/cancellationpolicy/<neighborhood>"
@app.route("/cancellationpolicy/<neighborhood>")
def cancellation_policy(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database
    listings_data_8 = pd.read_sql("SELECT * FROM listings",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped_8 = listings_data_8.loc[(listings_data_8["neighbourhood_group_cleansed"] == neighborhood),:]
    # Put the cancellation policies and the counts of each into a dictionary
    cancellation_policy_dictionary = listings_data_grouped_8["cancellation_policy"].value_counts().to_dict()
    # Return the JSONified dictionary
    return jsonify(cancellation_policy_dictionary)

# Define the route to "/bedtype/<neighborhood>"
@app.route("/bedtype/<neighborhood>")
def bedtype(neighborhood):
    # Run a query that selects everything from the listings table in the SQLite database
    listings_data_9 = pd.read_sql("SELECT * FROM listings",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listings_data_grouped_9 = listings_data_9.loc[(listings_data_9["neighbourhood_group_cleansed"] == neighborhood),:]
    # Put the bedtypes and the counts of each into a dictionary
    bed_type_dictionary = listings_data_grouped_9["bed_type"].value_counts().to_dict()
    # Return the JSONified dictionary
    return jsonify(bed_type_dictionary)

# Define the route to "/reviewcontentlist/<neighborhood>"
@app.route("/reviewcontentlist/<neighborhood>")
def reviewcontentlist(neighborhood):
    # Run a query that selects everything from the property_reviews table and left joins it with the listings table using listing_id in the SQLite database
    reviews_content_data = pd.read_sql("SELECT * FROM property_reviews LEFT JOIN listings ON property_reviews.listing_id = listings.id",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    reviews_content_data_grouped = reviews_content_data.loc[(reviews_content_data["neighbourhood_group_cleansed"] == neighborhood),:]
    # Return the JSONified list of all the comments for each neighborhood
    return jsonify(reviews_content_data_grouped["comments"].tolist())

# Define the route to "/superhost/<neighborhood>"
@app.route("/superhost/<neighborhood>")
def superhost(neighborhood):
    # Run a query that selects everything from the airbnb_hosts table and left joins it with the listings table using host_id in the SQLite database
    superhost_data = pd.read_sql("SELECT * FROM airbnb_hosts LEFT JOIN listings ON airbnb_hosts.host_id = listings.host_id",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    superhost_data_grouped = superhost_data.loc[(superhost_data["neighbourhood_group_cleansed"] == neighborhood),:]
    # Put the host_is_superhost booleans and the counts of each into a dictionary
    superhost_dictionary = superhost_data_grouped["host_is_superhost"].value_counts().to_dict()
    # Return the JSONified dictionary
    return jsonify(superhost_dictionary)

# Define the route to "/identityverified/<neighborhood>"
@app.route("/identityverified/<neighborhood>")
def identityverfified(neighborhood):
    # Run a query that selects everything from the airbnb_hosts table and left joins it with the listings table using host_id in the SQLite database
    identityverfified_data = pd.read_sql("SELECT * FROM airbnb_hosts LEFT JOIN listings ON airbnb_hosts.host_id = listings.host_id",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    identityverfified_data_grouped = identityverfified_data.loc[(identityverfified_data["neighbourhood_group_cleansed"] == neighborhood),:]
    # Put the host_identity_verified booleans and the counts of each into a dictionary
    identityverfified_dictionary = identityverfified_data_grouped["host_identity_verified"].value_counts().to_dict()
    # Return the JSONified dictionary
    return jsonify(identityverfified_dictionary)

# Define the route to "/listingscount/<neighborhood>"
@app.route("/listingscount/<neighborhood>")
def listingscount(neighborhood):
    # Run a query that selects everything from the airbnb_hosts table and left joins it with the listings table using host_id in the SQLite database and only includes rows with host_listings_count less than 34
    listingscount_data = pd.read_sql("SELECT * FROM airbnb_hosts LEFT JOIN listings ON airbnb_hosts.host_id = listings.host_id WHERE airbnb_hosts.host_listings_count<34",engine)
    # Ensure neighborhood column is equal to the chosen neighborhood (in the path)
    listingscount_data_grouped = listingscount_data.loc[(listingscount_data["neighbourhood_group_cleansed"] == neighborhood),:]
    # Return the JSONified list of all the counts of the numbers of listings the hosts own
    return jsonify(listingscount_data_grouped["host_listings_count"].tolist())
    
# Run the application
if __name__ == "__main__":
    app.run()
