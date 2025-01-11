import CalorieTracker from "./Tracker.js";
import Meal from "./Meal.js";
import Workout from "./Workout.js";
import Storage from "./Storage.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap";
import "./bootstrap.bundle.min.js";

console.log(123);

import "./css/style.css";
import "./css/bootstrap.css";
import "./css/bootstrap-utilities.css";
import "./css/bootstrap-grid.css";
import "./css/bootstrap-reboot.css";
import "./css/style.css";

import Modal, { Collapse } from "bootstrap";

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));

    document
      .getElementById("reset")
      .addEventListener("click", this._reset.bind(this));

    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));

    document
      .getElementById("limit-form")
      .addEventListener("submit", this._setLimit.bind(this));

    document
      .getElementById("meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));

    document
      .getElementById("workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));

    document
      .getElementById("filter-meals")
      .addEventListener("input", this._filterItems.bind(this, "meal"));

    document
      .getElementById("filter-workouts")
      .addEventListener("input", this._filterItems.bind(this, "workout"));
  }

  _newItem(type, e) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calorie = document.getElementById(`${type}-calories`);

    if (name.value === "" || calorie.value === 0) {
      alert("Fill in the required field");
      return;
    }

    let item;

    if (type === "meal") {
      item = new Meal(name.value, calorie.value);
      this._tracker.addMeal(item);
      const collapse = document.querySelector(
        `button[data-bs-target="#collapse-meal"]`
      );
      // collapse.click();
    } else {
      item = new Workout(name.value, calorie.value);
      this._tracker.addWorkout(item);
      const collapse = document.querySelector(
        `button[data-bs-target="#collapse-workout"]`
      );
      // collapse.click();
    }

    name.value = "";
    calorie.value = "";

    const collapseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new Collapse(collapseItem, {
      toggle: true,
    });
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      const item = e.target.closest(".card");
      const id = item.getAttribute("data-id");

      if (confirm("Are you sure?")) {
        if (type === "meal") {
          const parent = document.getElementById("meal-items");
          parent.removeChild(item);
          this._tracker.removeMeal(id);
        } else if (type === "workout") {
          const parent = document.getElementById("workout-items");
          parent.removeChild(item);
          this._tracker.removeWorkout(id);
        }
      }
    }
  }

  _setLimit(e) {
    e.preventDefault();
    // const limitForm = document.getElementById("limit-form");
    const closeBtn = document.querySelector(`button[data-bs-dismiss="modal"]`);
    const limitInput = document.getElementById("limit");

    if (limitInput.value === null || limitInput.value === "") {
      alert("Add a Limit");
      return;
    } else {
      Storage.setCalorieLimit(limitInput.value);
      this._tracker.setLimit(limitInput.value);
      limitInput.value = "";
      closeBtn.click();
    }
  }

  _reset() {
    const mealEl = document.getElementById("meal-items");
    const workoutEl = document.getElementById("workout-items");

    if (confirm("Do you really want to reset the day?")) {
      this._tracker.resetDay();
      mealEl.innerHTML = "";
      workoutEl.innerHTML = "";
      Storage.clearAll();
      document.getElementById("filter-meals").value = "";
      document.getElementById("filter-workouts").value = "";
      this._tracker._renderStats();
    }
  }

  _filterItems(type, e) {
    console.log(type);
    let items;
    const text = e.target.value.toLowerCase();

    const mealItem = document.getElementById("meal-items");
    const workoutItem = document.getElementById("workout-items");

    type === "meal"
      ? (items = mealItem.querySelectorAll(".card.my-2"))
      : (items = workoutItem.querySelectorAll(".card.my-2"));

    items.forEach((item) => {
      const name =
        item.firstElementChild.firstElementChild.firstElementChild.textContent.toLowerCase();

      if (name.indexOf(text) !== -1) {
        item.style.display = "block";
      } else if (name.indexOf(text) === -1) {
        item.style.display = "none";
      } else if (text === "" || text === null) {
        item.style.display = "block";
      }
    });
  }
}

const app = new App();
console.log(Collapse);
