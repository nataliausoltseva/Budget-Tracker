# Budget Tracker

This application is written in Typescript using React Native. It was only tested and designed for Android devices (currently fully supports Pixel 8 Pro).

The app offers dark/light mode.

## How to use it
### Income Page
When the application is loaded, the landing page is the Income page. You can select a currency, amount and frequency of your income.

<img src="./screenshots\income-landing-page-light-mode.png" style="height: 500px;" alt="Income Landing Page Light Mode"/>
<img src="./screenshots\income-landing-page-dark-mode.png" style="height: 500px;" alt="Income Landing Page Dark Mode"/>

In the burger menu you can select saver (e.g. KiwiSaver) with a custom percent; student loan with a custom rate and threhold; second income with a custom **yearly** payment.

<img src="./screenshots\income-options-modal-light-mode.png" style="height: 500px;" alt="Income Options Modal Light Mode"/>
<img src="./screenshots\income-options-modal-dark-mode.png" style="height: 500px;" alt="Income Options Modal Dark Mode"/>

Once you click on the Calculate button, the table will populate and a pie chart if your expenses will show up.

<img src="./screenshots\income-with-data-light-moda.png" style="height: 500px;" alt="Income With Data Page Light Mode"/>
<img src="./screenshots\income-with-data-light-moda.png" style="height: 500px;" alt="Income With Data Page Dark Mode"/>

### Budget Page
The second page is the Budget page. Initially there is only an add button.

<img src="./screenshots\budget-landing-page-light-mode.png" style="height: 500px;" alt="Budget Landing Page Light Mode"/>
<img src="./screenshots\budget-landing-page-dark-mode.png" style="height: 500px;" alt="Budget Landing Page Dark Mode"/>

In the add modal, you can add a new expense by providing a name, amount and the frequency the expense occurs: weekly, fortnightly, monthly, early or one-off.

<img src="./screenshots\budget-modal-light-mode.png" style="height: 500px;" alt="Budget Modal Page Light Mode"/>
<img src="./screenshots\budget-modal-dark-mode.png" style="height: 500px;" alt="Budget Modal Page Dark Mode"/>

Once expense(s) are added, you can see a list of them, with the pie chart that shows the amount of expenses for the selected frequency: weekly, fortnightly, monthly or early. One-off payments are added as they are and the same for all the frequencies.

The colour for the expenses are selected randomly.

Every expense can be deleted and edited.

If you entered/calculated income on the previous page, then your amount inside the pie chart might be positive. In this case, the `Add to savings` button is enabled. By clicking on the button, it adds a new row of expenses `Savings`.

<img src="./screenshots\budget-with-data-light-moda.png" style="height: 500px;" alt="Budget Landing Page With Data Light Mode"/>
<img src="./screenshots\budget-with-data-dark-moda.png" style="height: 500px;" alt="Budget Landing Page With Data Dark Mode"/>

### Saving Goals Page
The third page is the Saving Goals page. Initially there is only an add button.

<img src="./screenshots\saving-goals-landing-page-light-mode.png" style="height: 500px;" alt="Saving Goals Landing Page Light Mode"/>
<img src="./screenshots\saving-goals-landing-page-dark-mode.png" style="height: 500px;" alt="Saving Goals Landing Page Dark Mode"/>

In the add modal, you can add a new goal by providing a name, goal amount, saved amount and the due date of the goal. The due date has to be in future.

<img src="./screenshots\saving-goals-modal-light-mode.png" style="height: 500px;" alt="Saving Goals Modal Light Mode"/>
<img src="./screenshots\saving-goals-modal-dark-mode.png" style="height: 500px;" alt="Saving Goals Modal Dark Mode"/>

Once goal(s) are added, you can see a list of them. By default they are all collapsed and can be expanded one by one.

Based on the due date value, the countdown is going to show the time to go in days, hours, minutes and seconds. The time is counting down in live time.

Every row has delete and edit button. Delete button does not have confirm modal, so once it is clicked it is DELETED. The edit button takes back to the modal for the goal

<img src="./screenshots\saving-goals-with-data-collapsed-light-mode.png" style="height: 500px;" alt="Saving Goals Page With Collapsed Data Light Mode"/>
<img src="./screenshots\saving-goals-with-data-collapsed-dark-mode.png" style="height: 500px;" alt="Saving Goals Page With Collapsed Data Dark Mode"/>

Once the goal is expanded, all the goal's fields that you filled in is visible. Apart of them, you can add transactions by clicking on the `+` button. A transaction modal includes amount and the date when the amount was contributed.

 Once a transaction is contributed, you can see the chart of all them. The starting point depdends on what you entered into the goal's saved amount. When you reach the goal's amount, you will see another line across the chart indicating what needs to be reached.

 All transactions can be modified and deleted as the goals. 

<img src="./screenshots\saving-goals-with-data-expanded-light-mode.png" style="height: 500px;" alt="Saving Goals Page With Expanded Data Light Mode"/>
<img src="./screenshots\saving-goals-with-data-expanded-dark-mode.png" style="height: 500px;" alt="Saving Goals Page With Expanded Data Dark Mode"/>

### Investments Page
The last page is the Investments page. Initially there is only an add button.

<img src="./screenshots\investments-landing-page-light-mode.png" style="height: 500px;" alt="Investments Landing Page Light Mode"/>
<img src="./screenshots\investments-landing-page-dark-mode.png" style="height: 500px;" alt="Investments Landing Page Dark Mode"/>

In the add modal, you can add a new investment by providing a name, amount (that was invested), tax rate (based on your income), term amount, term amount time as a **month** or **year**, term rate and the start date of the investment.

<img src="./screenshots\investments-modal-light-mode.png" style="height: 500px;" alt="Investments Modal Light Mode"/>
<img src="./screenshots\investments-modal-dark-mode.png" style="height: 500px;" alt="Investments Modal Dark Mode"/>

Once investments(s) are added, you can see a list of them. By default they are all collapsed and can be expanded one by one.

Based on the term amount and time you have provided, the countdown is going to show the time to go in days, hours, minutes and seconds. The time is counting down in live time.

Every row has delete and edit button. Delete button does not have confirm modal, so once it is clicked it is DELETED. The edit button takes back to the modal for the inestment.

<img src="./screenshots\investments-with-data-collapsed-light-mode.png" style="height: 500px;" alt="Investments Page With Collapsed Data Light Mode"/>
<img src="./screenshots\investments-with-data-collapsed-dark-mode.png" style="height: 500px;" alt="Investments Page With Collapsed Data Dark Mode"/>

Once the invesment is expanded, all the investments's fields that you filled in are visible. Apart of them, you can see the chart with bars that is scrollable (based on the amount you have provided). The term rate is yearly so if the amount is in month time then you will only see 2 bars: current and at the end of the investment. The bar chart includes the initial investment and the return amount. Underneath, there is a table that summarises the bar chart. 
 

<img src="./screenshots\investments-with-data-expanded-dark-mode.png" style="height: 500px;" alt="Investments Page With Expanded Data Light Mode"/>
<img src="./screenshots\investments-with-data-expanded-light-mode.png" style="height: 500px;" alt="Investments Page With Expanded Data Dark Mode"/>