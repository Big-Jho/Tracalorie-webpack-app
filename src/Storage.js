class Storage {
  static getCalorieLimit(defaultLimit = 3000) {
    let limit;

    if (localStorage.getItem("calorieLimit") === null) {
      limit = defaultLimit;
      this.setCalorieLimit(defaultLimit);
    } else {
      limit = +localStorage.getItem("calorieLimit");
    }

    return limit;
  }

  static setCalorieLimit(value) {
    localStorage.setItem("calorieLimit", JSON.stringify(+value));
  }

  static getTotalCalorie(defaultTotal = 0) {
    let totalCalorie;

    if (localStorage.getItem("totalCalorie") === null) {
      totalCalorie = defaultTotal;
      Storage.updateTotalCalorie(defaultTotal);
    } else {
      totalCalorie = +localStorage.getItem("totalCalorie");
    }

    return totalCalorie;
  }

  static updateTotalCalorie(calorie) {
    localStorage.setItem("totalCalorie", calorie);
  }

  static saveMeal(meal) {
    if (localStorage.getItem("meal") === null) {
      const meals = [];
      meals.push(meal);
      localStorage.setItem("meal", JSON.stringify(meals));
    } else {
      const meals = JSON.parse(localStorage.getItem("meal"));
      meals.push(meal);
      localStorage.setItem("meal", JSON.stringify(meals));
    }
  }

  static saveWorkout(workout) {
    if (localStorage.getItem("workout") === null) {
      const workouts = [];
      workouts.push(workout);
      localStorage.setItem("workout", JSON.stringify(workouts));
    } else {
      const workouts = JSON.parse(localStorage.getItem("workout"));
      workouts.push(workout);
      localStorage.setItem("workout", JSON.stringify(workouts));
    }
  }

  static getMeals() {
    if (localStorage.getItem("meal") === null) {
      const meals = [];
      localStorage.setItem("meal", JSON.stringify(meals));
      return meals;
    } else {
      const meals = JSON.parse(localStorage.getItem("meal"));
      return meals;
    }
  }

  static getWorkouts() {
    if (localStorage.getItem("workout") === null) {
      const workouts = [];
      localStorage.setItem("workout", JSON.stringify(workouts));
      return workouts;
    } else {
      const workouts = JSON.parse(localStorage.getItem("workout"));
      return workouts;
    }
  }

  static clearAll() {
    localStorage.clear();
  }
}

export default Storage;
