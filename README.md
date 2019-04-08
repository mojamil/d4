# d4

## Description of Data Set
The cereal.csv file contains information on each cereal brand such as calories, protein content, carb content, and more.
The information is useful to understanding if one is really starting off their day right.

cereal.csv was taken from [here](https://gist.github.com/SinnerShanky/925f08febd10b40b8b5e)

## Description of Visualization
Absent user interaction, a scatterplot will be shown with Calories on the X-axis and a nutrient of your chouce on the Y-Axiz. Dots will represent each cereal and its respective nutrient content. Buttons will be displayed to change the nutrient of the Y-axis (from protein to carb as an example).

We also included a histogram that shows the distribution of different nutrients among the cereal, a sunburst chart that compares the ratio of different nutrients in different cereals within certain rating groups, and pie charts describing the composition of those cereals. 

#### Interaction
To interact with the visualization, the user can press different buttons to view cereal data based on varied nutrients. In addition, the user can hover over the dots in the scatterplot and a pop-up will display the cereal name and its x,y values. The user can also zoom into different sections of the sunburst chart. 

#### Question(s)
The visualization will provoke the question of whether one is maximizing his nutrient intake from cereal.

### Explanation of D3 Feature Utilization 
We will use D3 to enter selections to retrieve data like each cereal's calories and the select nutrients from the cereal.csv file to our graphs.
When the user wants to see a different nutrient, say changing from protein(yay) to carbs(yuck), they can press a button corresponding to the nutrient. 
We will then use exit selection to remove the previous nutritional data and use enter selection to enter the new select nutrients, thus updating our graphs.
The dots representing each cereal will shift their location after pressing a new nutrient button, creating our transitions.

The user interacts with the plot by hovering over each dot, which will display a pop-up detailing information about the cereal brand.
Our project is the most similar to the scatterplots in the gallery, like the scatterplot matrix. We put one set of information on one axis and another set on the other axis. We plot individual points on the graph to represent sets of data points. Unlike the scatterplot matrix however, we are working with simpler information and only using two dimensional graphs. We also included versions of sunburst charts, histograms, and pie charts. 

## Sketch of Envisioned Visualization
![Diagram](https://i.imgur.com/e0Zbpcw.png)

## How To Launch
1. Clone the repo
    * ssh - `git@github.com:Zer0-M/d4.git`
    * https - `https://github.com/Zer0-M/d4.git`
2. `$ cd d4`
   * Move to root of repo
3. `pip install -r requirements.txt`
    * Install the requirements for d4  
4.  `$ . location_of_venv/venv_name/bin/activate`
    * Activate your virtual environment
5. `$ python app.py`
    * Start d4's project
6. Open up your browser and type [127.0.0.1:5000](http://127.0.0.1:5000/)
    * Load project in browser


## LAUNCH CODES 


