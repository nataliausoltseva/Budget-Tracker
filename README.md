# Budget Tracker

This application is written in Typescript using React Native. It was only tested and designed for Android devices (currently fully supports Pixel 8 Pro).

The app offers dark/light mode.

## How to use it
### Income Page
When the application is loaded, the landing page is the Income page. You can select a currency, amount and frequency of your income.

<img src="./screenshots\income-landing-page-light-mode.png" style="height: 500px;" alt="Income Landing Page Light Mode"/>

In the burger menu you can select saver (e.g. KiwiSaver) with a custom percent; student loan with a custom rate and threhold; second income with a custom **yearly** payment.

<img src="./screenshots\income-options-modal-light-mode.png" style="height: 500px;" alt="Income Landing Page Light Mode"/>

Once you click on the Calculate button, the table will populate and a pie chart if your expenses will show up.

<img src="./screenshots\income-with-data-light-moda.png" style="height: 500px;" alt="Income Landing Page Light Mode"/>


### Budget Page
The second page is the Budget page. Initially there is only an add button.

<img src="./screenshots\budget-landing-page-light-mode.png" style="height: 500px;" alt="Income Landing Page Light Mode"/>

In the add modal, you can add a new expense by providing a name, amount and the frequency the expense occurs: weekly, fortnightly, monthly, early or one-off.

<img src="./screenshots\budget-modal-light-mode.png" style="height: 500px;" alt="Income Landing Page Light Mode"/>

Once expense(s) are added, you can see a list of them, with the pie chart that shows the amount of expenses for the selected frequency: weekly, fortnightly, monthly or early. One-off payments are added as they are and the same for all the frequencies.

The colour for the expenses are selected randomly.

Every expense can be deleted and edited.

If you entered/calculated income on the previous page, then your amount inside the pie chart might be positive. In this case, the `Add to savings` button is enabled. By clicking on the button, it adds a new row of expenses `Savings`.

<img src="./screenshots\budget-with-data-light-moda.png" style="height: 500px;" alt="Income Landing Page Light Mode"/>