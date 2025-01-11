import Storage from "./Storage";
// import Workout from "./Workout";
// import Meal from "./Meal";

class CalorieTracker {
  constructor() {
    this._calorieLimit = Storage.getCalorieLimit();
    this._totalCalorie = Storage.getTotalCalorie();
    this._meal = Storage.getMeals();
    this._workout = Storage.getWorkouts();

    document.addEventListener("DOMContentLoaded", this._renderStats.bind(this));
    document.addEventListener("DOMContentLoaded", this.loadItems.bind(this));
  }

  addMeal(meal) {
    this._totalCalorie += new Number(meal.calorie);
    Storage.updateTotalCalorie(this._totalCalorie);
    this._meal.push(meal);
    Storage.saveMeal(meal);
    this._displayNewMeal(meal);
    this._renderStats();
  }

  addWorkout(workout) {
    this._totalCalorie -= new Number(workout.calorie);
    Storage.updateTotalCalorie(this._totalCalorie);
    this._workout.push(workout);
    Storage.saveWorkout(workout);
    this._displayNewWorkout(workout);
    this._renderStats();
  }

  removeMeal(id) {
    for (let i = 0; i < Storage.getMeals().length; i++) {
      const meals = Storage.getMeals();
      if (meals[i].id == id) {
        const mealIndex = i;
        const newTotalCalorie =
          Storage.getTotalCalorie() - meals[mealIndex].calorie;
        Storage.updateTotalCalorie(newTotalCalorie);
        meals.splice(mealIndex, 1);
        localStorage.setItem("meal", JSON.stringify(meals));
        this._renderStats();
      }
    }
  }

  removeWorkout(id) {
    for (let i = 0; i < Storage.getWorkouts().length; i++) {
      const workouts = Storage.getWorkouts();
      if (workouts[i].id == id) {
        const workoutIndex = i;
        const newTotalCalorie =
          Storage.getTotalCalorie() + workouts[workoutIndex].calorie;
        Storage.updateTotalCalorie(newTotalCalorie);
        workouts.splice(workoutIndex, 1);
        localStorage.setItem("workout", JSON.stringify(workouts));
        this._renderStats();
      }
    }
  }

  resetDay() {
    this._meal = [];
    this._workout = [];
    this._renderStats();
  }

  setLimit() {
    this._calorieLimit = document.getElementById("limit").value;
    this._renderStats();
  }

  loadItems() {
    document.getElementById("meal-items").innerHTML = "";
    document.getElementById("workout-items").innerHTML = "";
    this._meal.forEach((meal) => {
      this._displayNewMeal(meal);
    });

    this._workout.forEach((workout) => {
      this._displayNewWorkout(workout);
    });
    this._renderStats();
  }

  get totalCalorie() {
    return this.calorieConsumed - this.calorieBurned;
  }

  get calorieConsumed() {
    return Storage.getMeals().reduce((acc, meal) => {
      return acc + +meal.calorie;
    }, 0);
  }

  get calorieBurned() {
    return Storage.getWorkouts().reduce((acc, cal) => {
      return acc + +cal.calorie;
    }, 0);
  }

  get calorieRemaining() {
    return Storage.getCalorieLimit() - Storage.getTotalCalorie();
  }

  _displayCalorieRemaining() {
    const remaining = this.calorieRemaining;
    const calorieRemainingEl = document.getElementById("calories-remaining");
    calorieRemainingEl.innerText = remaining;

    if (remaining <= 0) {
      calorieRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      calorieRemainingEl.parentElement.parentElement.classList.add("bg-danger");
    } else {
      calorieRemainingEl.parentElement.parentElement.classList.add("bg-light");
      calorieRemainingEl.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
    }
  }

  _displayCalorieLimit() {
    const limit = this._calorieLimit;
    const calorieLimitEl = document.getElementById("calories-limit");
    calorieLimitEl.innerText = limit;
  }

  _displayCalorieConsumed() {
    const calorieConsumedEl = document.getElementById("calories-consumed");
    calorieConsumedEl.innerText = this.calorieConsumed;
  }

  _displayCalorieBurned() {
    const calorieBurnedEl = document.getElementById("calories-burned");
    calorieBurnedEl.innerText = this.calorieBurned;
  }

  _displayCalorieTotal() {
    const calorieTotalEl = document.getElementById("calories-total");

    const total = Storage.getTotalCalorie();

    calorieTotalEl.innerText = total;
  }

  _displayProgressBar() {
    const progress =
      (Storage.getTotalCalorie() / Storage.getCalorieLimit()) * 100;
    const progressBar = document.getElementById("calorie-progress");

    // console.log(progress.toFixed().toString().substring(1) + "%");
    progress >= 0
      ? (progressBar.style.width = progress.toFixed().toString() + "%")
      : (progressBar.style.width =
          progress.toFixed().toString().substring(1) + "%");

    if (progress >= 100) {
      progressBar.classList.contains("bg-primary")
        ? progressBar.classList.remove("bg-primary")
        : progressBar.classList.remove("bg-reverse");
      progressBar.classList.add("bg-danger");
      // document.querySelector(".progress").style.flexDirection = "row";
    } else if (progress < 0) {
      progressBar.classList.contains("bg-primary")
        ? progressBar.classList.remove("bg-primary")
        : progressBar.classList.remove("bg-danger");
      progressBar.classList.add("bg-reverse");
      progressBar.style.backgroundColor = "#ffc107";
      // document.querySelector(".progress").style.flexDirection = "row-reverse";
    } else {
      progressBar.classList.contains("bg-danger")
        ? progressBar.classList.remove("bg-danger")
        : progressBar.classList.remove("bg-reverse");
      progressBar.classList.add("bg-primary");
      // document.querySelector(".progress").style.flexDirection = "row";
    }
  }

  _displayNewMeal(meal) {
    const mealsDiv = document.getElementById("meal-items");
    const newMeal = document.createElement("div");
    newMeal.classList.add("card", "my-2");
    newMeal.setAttribute("data-id", meal.id);
    newMeal.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${meal.name}</h4>
          <div
            class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${meal.calorie}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    mealsDiv.appendChild(newMeal);
  }

  _displayNewWorkout(workout) {
    const workoutsDiv = document.getElementById("workout-items");
    const newWorkout = document.createElement("div");
    newWorkout.classList.add("card", "my-2");
    newWorkout.setAttribute("data-id", workout.id);
    newWorkout.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${workout.name}</h4>
          <div
            class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
          >
            ${workout.calorie}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    workoutsDiv.appendChild(newWorkout);
  }

  _renderStats() {
    this._displayCalorieLimit();
    this._displayCalorieRemaining();
    this._displayCalorieBurned();
    this._displayCalorieTotal();
    this._displayCalorieConsumed();
    this._displayProgressBar();
  }
}

export default CalorieTracker;
