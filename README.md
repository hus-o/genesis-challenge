# UI Developer Exercise

To run the app:

1. npm install
2. npm start

# Notes

- I've kept the UI barebones and not included any account/balance system as the instructions said I could decide how basic/complex I wanted to make it and with the bank holiday time constraints I didn't want to overdo it.

- I chose to to use localStorage for minimal data storage for the orders as I think it's better in case of accidental refresh etc. to keep details

- I chose to use React as this is something I'm familiar with and could work quickly in a short time, if I had more time I'd explore redoing it with web components. I also used regular css.

- I've included some simple input validation and kept the visualised values to 5 or 2 decimal places depending on what it is. I didn't reduce the decimal places at point of getting the value because I wanted to keep precision on future calculations.

- Assumed the AcceptableVariance was the value 0.4 rather than a percentage or something else

- I have previously built something similar but more complex (involving auth and db), linked here: https://github.com/hus-o/stock-trading-app
