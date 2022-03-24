# UI Developer Exercise

To run the app:

1) npm install
2) npm run start

# Exercise Instructions

Create an FX trading app that enables a user to trade from a given list of currency pairs and keeps a record of previous trades.

1) The app should allow the selection of two different currencies from the supported list.

2) When two currencies have been selected the user should be able to open a trading widget.
The trading widget should allow the user to:
- Set the order size
- See the calculated value of the trade based on current price
- BUY or SELL at the current price

3) When the user clicks a price, they should be shown a confirmation screen.
The confirmation screen should warn the user if the current price moves above or below the selected trade price by the AcceptablePriceVariance value. *How you choose to present this to the user is up to you.*

4) Once the user accepts the price on the confirmation screen, the trade should be executed and placed in a list of previous trades.
This should show the price, currency, size, value and time the order was made.

5) If the user closes a trading widget it should unsubscribe from the price stream.

# Requirements
- Please use Typescript & CSS
- Use the PricingService provided (feel free to modify)

# Other information
Use any libraries or frameworks as you see fit.

You don't have to use the project provided, it's just to give you a starting point. Feel free to use your preferred project/build tool.

You solution will form the basis of a technical discussion.

**Extra points awarded for using web components** 🙂
