'use strict'

var enabledDates = new Set();
var request;
var itemsArray;
var caloriesSum = 0;
var selectedItemsArray =  [];
var addButton = document.getElementById('add');
var addNewMeal = document.getElementById('new-meal');
var addNewCalories = document.getElementById('new-calories');
var addNewDate = document.getElementById('new-date');
var summary = document.getElementById('summary');
var itemsContainer = document.querySelector('.items-container');
var url = 'http://localhost:3001/meals';
var datePicker = document.querySelector('.dropbtn');
datePicker.addEventListener('click', openDatePicker);
addNewDate.valueAsDate = new Date();
addButton.addEventListener('click', callAddNewItem);

function createMenuContent(datesSet) {
    clearItemsFromDisplay(document.getElementById("myDropdown"));
    Array.from(datesSet).forEach(function(date) {
        var newDateDiv = document.createElement('div');
        document.getElementById("myDropdown").appendChild(newDateDiv);
        newDateDiv.innerText = date;
        newDateDiv.setAttribute('id', date);
        newDateDiv.classList.add('dropdown-content');
        newDateDiv.addEventListener('click', mealFilter);
    });
}

function openDatePicker() {
    createMenuContent(enabledDates);
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function isInputValid() {
   return (addNewMeal.value !== '' && addNewCalories.value !== '');
}

function loadEnabledDaysSet(item) {
  enabledDates.add(formatDate(item));
}

function callAddNewItem() {
  if (isInputValid()) {addNewItem(addNewMeal.value.toUpperCase(),Math.abs(parseInt(addNewCalories.value)),addNewDate.value);}
  else {humane.log('Mealname or calorie is missing!');}
  setTimeout(requestItems(displayItems),600);
}

function clearDatas() {
  summary.innerText = 0 + ' kcal';
  selectedItemsArray.length = 0;
  caloriesSum = 0;
}

function mealFilter() {
  clearDatas();
  filterArray();
  displayItems(selectedItemsArray);
  animatedCounter('summary', 0, caloriesSum, 100);
}

function dateComparator(item) {
  if (formatDate(item) === (event.target.id)) {return true;}
  return false;
}

function filterArray() {
  itemsArray.forEach(function(item) {
    if(dateComparator(item)) {
      selectedItemsArray.push(item);
      caloriesSum += item.calories;
    }
  });
}

function clearItemsFromDisplay(object) {
  while (object.firstChild) {
    object.removeChild(object.firstChild);
  }
}

function clearInputFields() {
  addNewMeal.value = '';
  addNewCalories.value = '';
  addNewDate.valueAsDate = new Date();
  summary.innerText = 0 + ' kcal';
}

function isRequestOK(request) {
  return request.readyState === 4
}

function createNewRow(item) {
  var newRow = document.createElement('div');
  newRow.setAttribute('id', item.id);
  newRow.setAttribute('class', 'item-row');
  itemsContainer.appendChild(newRow);
  newRow.addEventListener('dblclick', callDeleteItem);
  createSpans(newRow, item);
}

function createSpan(newRow, text, item, itemattribute) {
  var newspan = document.createElement('span');
  newRow.appendChild(newspan);
  newspan.innerText = item[itemattribute] + text;
}

function formatDate(item) {
  return (new Date(item.date)).toLocaleDateString('hu-HU');
}

function createSpans(newRow, item) {
  item.date = formatDate(item);
  createSpan(newRow, '', item, 'meal');
  createSpan(newRow, ' kcal', item, 'calories');
  createSpan(newRow, '', item, 'date');
}

function displayItems(itemsArray) {
  clearInputFields();
  clearItemsFromDisplay(itemsContainer);
  itemsArray.forEach(function(item) {
    createNewRow(item);
    loadEnabledDaysSet(item);
  });
}

function callDeleteItem() {
  deleteItem(event.target.parentNode.id);
}

function requestItems(cb) {
  createRequest('GET', url, '');
  request.onreadystatechange = function() {
    if (isRequestOK(request)) {
      itemsArray = JSON.parse(request.response);
      displayItems(itemsArray);
    }
  }
}

function deleteItem(itemId) {
  createRequest('DELETE', url + '/' + itemId, '');
  request.onreadystatechange = function() {
    if (isRequestOK(request)) {
      requestItems(displayItems);
    }
  }
}

function addNewItem (meal, calories, date) {
  var newMeal = JSON.stringify({meal: meal, calories: calories, date: date});
  createRequest('POST', url, newMeal);
}

function createRequest(method, url, meal) {
  request = new XMLHttpRequest();
  request.open(method, url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(meal);
}

requestItems(displayItems);
