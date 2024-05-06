from flask import Flask, jsonify
from flask_cors import CORS
import friendtech

app = Flask(__name__)
CORS(app)

# Create a friendtech platform instance
# Define your API route
my_jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHg5MjQ1ZDRlNzg5Y2Y5ZWY0YTJhZDE4MDJhZDlmODZkZWQzNGVjZGNiIiwiaWF0IjoxNzE0MjQyMDcyLCJleHAiOjE3MTY4MzQwNzJ9.8ZmaaIZgYbRcEScc95kyngNaHKhMqQVZMCJhnkX23Vw"

#we get unauthorized in this call fix it later
@app.route("/recent/joined")
def get_recently_joined_users():
    try:
        platform = friendtech.Platform()
        response = platform.getRecentlyJoinedUsers()
        
        if response.status_code == 200:
            user_info = response.json()
            print(user_info)
            return user_info
        else: 
            return {"error": f"an error occured please check req url and try again {response.status_code}"}, response.status_code
    except Exception as e:
        return {"error": f"unknown error on request: {str(e)}"}, 500


@app.route("/get-holders/<address>")
def members(address):
    try:
        platform = friendtech.Platform()
        # Make API call to get info from address
        response = platform.getHolders(address)

        # Check if the response is successful (status code 200)
        if response.status_code == 200:
            # Attempt to parse JSON response
            user_info = response.json()
            print(user_info)
            return user_info  # Return the JSON response
        else:
            # Handle unsuccessful response (e.g., log error or return appropriate error response)
            return {"error": f"API request failed with status code {response.status_code}"}, response.status_code

    except Exception as e:
        # Handle exceptions raised during the API request
        #the f is like tilda in js you can put variables within strings
        return {"error": f"An error occurred: {str(e)}"}, 500  # Return a generic error message with status code 500


#get info of a user
@app.route("/search/id/<id>")
def getHolders(id):
    try:
        platform = friendtech.Platform()
        # Make API call to get info from address
        response = platform.getInfoFromUserID(id)

        # Check if the response is successful (status code 200)
        if response.status_code == 200:
            # Attempt to parse JSON response
            user_info = response.json()
            print(user_info)
            return user_info  # Return the JSON response
        else:
            # Handle unsuccessful response (e.g., log error or return appropriate error response)
            return {"error": f"API request failed with status code {response.status_code}"}, response.status_code

    except Exception as e:
        # Handle exceptions raised during the API request
        return {"error": f"An error occurred: {str(e)}"}, 500  # Return a generic error message with status code 500
    


#search for a specific friend tech user by using twitter username
@app.route("/search/twitter/<username>")
def search_by_twitter(username):
    try:
        jwt = my_jwt
        platform = friendtech.Platform(jwt=my_jwt)
        response = platform.getAddressFromTwitterUsername(username)

        if response.status_code == 200:
            twitter_user_info = response.json()
            print(twitter_user_info)
            return twitter_user_info
        else:
            return {"Error": f"cannot complete request: {response.status_code}"}, response.status_code
            
    except Exception as e:
        return {"Error": f"unknown error occurred {str(e)}"}, 500
        

#get share and profile information from a address
@app.route("/search/address/<address>", methods=["GET"])
def search_by_address (address):
    try:
        platform = friendtech.Platform()
        response = platform.getInfoFromAddress(address)
        if response.status_code == 200:
            user_info = response.json()
            print(user_info)
            return user_info
        else:
            return {"error": "Cannot complete request invalid address provided"}, response.status_code
    except Exception as e:
        return {"error": f"Error occurred most likely unauthorized {str(e)}"}, 500
        

#get a addresses friend tech holdings
@app.route("/search/holdings/<address>")
def get_address_holdings(address):
    try: 
        platform = friendtech.Platform()
        response = platform.getHoldings(address)
        
        address_holdings = response.json()
        print(address_holdings)
        return address_holdings
    except Exception as e:
        return {"error": f"Error occurred most likely unauthorized {str(e)}"}, 500


#getting buy price of a specific share
#if u get checksum err you gotta do in temrinal source venv/bin/activate
@app.route("/share-buy/price/<address>")
def get_share_buy_price(address):
    print(address)
    try:
        contract = friendtech.Contract()
        response = contract.getBuyPriceAfterFee(address, 1)
        return {"price": response / 10**18}
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500
    

@app.route("/share-buy/price/<address>/<amount>")
def get_share_buy_price_specific(address, amount):
    print(address)
    try:
        contract = friendtech.Contract()
        response = contract.getBuyPriceAfterFee(address, int(amount))
        return {"price": response / 10**18}
    except Exception as e:
        print(e)
        return {"error": str(e)}, 500
        
@app.route("/get/share-sell/price/<address>")
def get_share_sell_price(address):
    try:
        contract = friendtech.Contract()
        response = contract.getSellPriceAfterFee(address, 1)
        print(response)
        return {"sell price": response / 10**18}
    except Exception as e:
        return {"error": f"Error occurred most likely unauthorized {str(e)}"}


@app.route("/get/share-supply/<address>")
def get_share_supply(address):
    try:
        contract = friendtech.Contract()
        response = contract.getSharesSupply(address)
        print(response)
        return response
    except Exception as e:
        return {"error": f"Error occurred most likely unauthorized {str(e)}"}

#getting share balance of a specific friend tech share of a user  
    #fix not working
@app.route("/get/share-specific/holdings/<address>/<subjectaddress>")
def get_specific_shares_owned(address, subjectaddress):
    try:
        contract = friendtech.Contract()
        print(subjectaddress, address)
        sharesOwned = contract.getSharesSupply(address, subjectaddress)
        print(sharesOwned)
        return {"shares owned": sharesOwned}
    except Exception as e:
        return {"error": f"Error occurred most likely unauthorized {str(e)}"}
        
        


# Run the Flask app
if __name__ == "__main__":
    app.run(port=8080)
