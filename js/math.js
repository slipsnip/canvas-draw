export default rangeRandom(min, max) {
    return Math.random() * (max - min) + min;
}