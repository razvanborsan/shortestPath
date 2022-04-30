import { getDistanceFromCoords } from 'components/TspVisualizer/helpers';
import { computeCost } from './helpers';

const farthestInsertion = (capitals) => {
  const points = [...capitals.features];

  const randomIndex = Math.floor(Math.random() * points.length);
  const randomItem = points[randomIndex];
  points.splice(randomIndex, 1);

  const path = [randomItem];
  path.push(path[0]);
  const pathsAnimation = [[...path]];

  while (points.length > 0) {
    let [farthestPoint, farthestDistance] = [null, 0];

    points.forEach((point, pointIndex) => {
      let [minimumCost, minimumCostId] = [Infinity, null];

      path.forEach((pathPoint) => {
        const dist = getDistanceFromCoords(
          pathPoint.geometry.coordinates,
          point.geometry.coordinates,
        );

        if (dist < minimumCost) {
          minimumCostId = pointIndex;
          minimumCost = dist;
        }
      });

      if (minimumCost > farthestDistance) {
        [farthestPoint, farthestDistance] = [minimumCostId, minimumCost];
      }
    });

    const [nextPoint] = points.splice(farthestPoint, 1);

    const bestPointIndex = computeCost(path, nextPoint);
    path.splice(bestPointIndex, 0, nextPoint);
    pathsAnimation.push([...path]);
  }

  return pathsAnimation;
};

export default farthestInsertion;
