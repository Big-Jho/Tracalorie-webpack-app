class Workout {
  constructor(name, calorie) {
    this.id = new Date().getTime();
    this.name = name;
    this.calorie = +calorie;
  }
}

export default Workout;
