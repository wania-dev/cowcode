const cows = {};

function recordYield(id, yield) {
  // Check if the cow with the given ID exists in the cows object
  if (!cows[id]) {
    // If not, initialize the object for the cow
    cows[id] = {
      totalYield: 0,
      dailyYields: [],
      averageYield: 0
    };
  }

  // Update the total yield for the cow of the week 
  cows[id].totalYield += yield;

  // Add the current yield to the list of daily yields
  cows[id].dailyYields.push(yield);

  // Calculate the average yield for the cow
  cows[id].averageYield = cows[id].totalYield / cows[id].dailyYields.length;
}

function getBestYield() {
  let bestYield = 0;
  let bestCow = null;

  // Loop through all cows and find the one with the highest total yield
  for (const id in cows) {
    if (cows[id].totalYield > bestYield) {
      bestYield = cows[id].totalYield;
      bestCow = id;
    }
  }

  return bestCow;
}

function getLowYielders() {
  const lowYielders = [];

  // Loop through all cows and find the ones with a yield of less than 12 liters on four or more days
  for (const id in cows) {
    let lowYieldDays = 0;
    for (const yield of cows[id].dailyYields) {
      if (yield < 12) {
        lowYieldDays++;
      }
    }

    if (lowYieldDays >= 4) {
      lowYielders.push(id);
    }
  }

  return lowYielders ;
}

function getWeeklyTotals() {
  let totalYield = 0;
  let totalCows = 0;

  // Loop through all cows and calculate the total yield and number of cows
  for (const id in cows) {
    totalYield += cows[id].totalYield;
    totalCows++;
  }

  return {
    totalYield,
    averageYield: totalYield / totalCows
  };
}

// Set up event listeners for the buttons
function takeInput() {
    document.getElementById('low-yielders-output').innerHTML = ''
    document.getElementById('weekly-totals-output').textContent = ''
    document.querySelector('.best-yield-output').innerHTML = ''

    // Get the ID and yield values from the input elements
    const id = document.getElementById('id-input').value;
    const y = document.getElementById('yield-input').value;

    // check if input fields are empty
    if (id == '' && y == ''){
        alert('You\'ve forgotten both values. Enter BOTH OF EM') 
        return 
    } else if (y == ''){
        alert(`Ugghhhh!!! You're recording a yeild for godsake 😒`)
        return 
    } else if (id == ''){
        alert('U forgot to enter the ID. Or maybe you did it on purpose')
        return 
    }
  
    // Check if the ID is a three-digit number
    if (id.length !== 3) {
      alert('Error: ID must be a unique three-digit number');
      return;
    }
  
    // Check if the ID has already been used
    if (cows[id]) {
      alert('Error: ID has already been used');
      return;
    }
  
    // Check if the yield is a positive number
    if (isNaN(y) || Number(y) <= 0) {
      alert('Error: Yield must be a positive number');
      return;
    }
  
    // clear the input fields 
    document.getElementById('id-input').value = ''
    document.getElementById('yield-input').value = ''

    // Record the yield for the cow
    recordYield(id, y);
}
  
  
function displayBestYield() {
    document.getElementById('low-yielders-output').innerHTML = ''
    document.getElementById('weekly-totals-output').textContent = ''
    // Get the best yield
    const bestYield = getBestYield();

    // Update the best yield output element
    if (bestYield == undefined){
        document.querySelector('.best-yield-output').innerHTML = `Error: Enter values to get the best yeild`;
    } else {
        document.querySelector('.best-yield-output').innerHTML = bestYield;
    }
};
  
function displayLowYeilders() {
    document.querySelector('.best-yield-output').innerHTML = ''
    document.getElementById('weekly-totals-output').textContent = ''
    // Get the low yielders
    const lowYielders = getLowYielders();
    
    // Update the low yielders output element
    if (lowYielders.length == 0){
        document.getElementById('low-yielders-output').innerHTML = `There are currently no cows who've produced a yeild of less than 12 litres for 4 or more days`;
    } else {
        document.getElementById('low-yielders-output').innerHTML = lowYielders.join(', ');
    }
};
  
function displayWeeklyTotal() {
    // Get the weekly totals
    document.getElementById('low-yielders-output').innerHTML = ''
    document.querySelector('.best-yield-output').innerHTML = ''

    const totals = getWeeklyTotals();
    
    // Update the weekly totals output element
    if (isNaN(totals.averageYield)) {
        let msg = 'No average yet calculated';
        document.getElementById('weekly-totals-output').textContent = `Total yield: ${parseInt(totals.totalYield)}, Average yield: ${msg}`;
      } else {
        document.getElementById('weekly-totals-output').textContent = `Total yield: ${parseInt(totals.totalYield)}, Average yield: ${totals.averageYield}`;
      }
      
};
