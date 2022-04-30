import { getDistanceFromCoords } from 'components/TspVisualizer/helpers';

const nearestNeighbour = (capitals) => {
  const points = [...capitals.features];

  const randomIndex = Math.floor(Math.random() * points.length);
  const randomItem = points[randomIndex];
  points.splice(randomIndex, 1);

  const path = [randomItem];
  const pathsAnimation = [[...path]];

  while (points.length > 0) {
    points.sort(
      (a, b) => getDistanceFromCoords(
        path[path.length - 1].geometry.coordinates,
        b.geometry.coordinates,
      )
        - getDistanceFromCoords(
          path[path.length - 1].geometry.coordinates,
          a.geometry.coordinates,
        ),
    );

    path.push(points.pop());
    pathsAnimation.push([...path]);
  }

  path.push(path[0]);
  pathsAnimation.push([...path]);
  return pathsAnimation;
};

export default nearestNeighbour;
