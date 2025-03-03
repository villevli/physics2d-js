A small 2d physics demo calculating collisions and forces between polygons.
Implemented in JavaScript without libraries.

## Controls
- Click to give all objects an impulse towards the clicked point
- Press "c" to create a 5-gon at the cursor
- Press "w" to draw polygons without fill color
- Press "d" to draw the normal vector of all collisions with red
- Press "space" to pause the simulation and "s" to run one step
- Press "+" to lessen gravity
- Press "-" to increase gravity

## Known issues
- Friction not implemented
- Sometimes polygons can overlap presumably due to collision checks not working when the corners (vertices) of two polygons collide each other directly
- Sometimes when the browser is unfocused and focused again the existing polygons disappear. Did they fall outside the walls?
