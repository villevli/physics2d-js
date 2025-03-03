/* eslint-disable no-unused-vars */

// Utility classes & functions

// Vector class with vector math operations
// although this is a 2D engine, 3-component vector is used so certain operations are easier.
class Vector3 {

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     */
    constructor(x = 0, y = 0, z = 0) {
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.z = z ?? 0;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @returns 
     */
    set(x, y, z) {
        this.x = x ?? this.x;
        this.y = y ?? this.y;
        this.z = z ?? this.z;
        return this;
    }

    /**
     * 
     * @param {Vector3} v2 
     * @returns 
     */
    add(v2) {
        return new Vector3(this.x + v2.x, this.y + v2.y, this.z + v2.z);
    }

    /**
     * 
     * @param {Vector3} v2 
     * @returns 
     */
    sub(v2) {
        return new Vector3(this.x - v2.x, this.y - v2.y, this.z - v2.z);
    }

    /**
     * 
     * @param {number} s 
     * @returns 
     */
    mul(s) {
        return new Vector3(this.x * s, this.y * s, this.z * s);
    }

    /**
     * 
     * @param {number} s 
     * @returns 
     */
    div(s) {
        return new Vector3(this.x / s, this.y / s, this.z / s);
    }

    /**
     * 
     * @param {Vector3} v2 
     * @returns 
     */
    dot(v2) {
        return this.x * v2.x + this.y * v2.y + this.z * v2.z;
    }

    /**
     * 
     * @param {Vector3} v2 
     * @returns 
     */
    cross(v2) {
        return new Vector3(
            this.y * v2.z - this.z * v2.y,
            this.z * v2.x - this.x * v2.z,
            this.x * v2.y - this.y * v2.x
        );
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    sqrMagnitude() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * 
     * @param {Vector3} onVec 
     * @returns 
     */
    project(onVec) {
        return onVec.mul(this.dot(onVec) / onVec.sqrMagnitude());
    }

    normalized() {
        return this.div(this.magnitude());
    }
}

class Matrix3 {

    /**
     * Matrix 3x3 (first number is row, second is column)
     * @param {number} m00 
     * @param {number} m01 
     * @param {number} m02 
     * @param {number} m10 
     * @param {number} m11 
     * @param {number} m12 
     * @param {number} m20 
     * @param {number} m21 
     * @param {number} m22 
     */
    constructor(
        m00 = 1, m01 = 0, m02 = 0,
        m10 = 0, m11 = 1, m12 = 0,
        m20 = 0, m21 = 0, m22 = 1) {
        this.m00 = m00; this.m01 = m01; this.m02 = m02; // row 1
        this.m10 = m10; this.m11 = m11; this.m12 = m12; // row 2
        this.m20 = m20; this.m21 = m21; this.m22 = m22; // row 3
    }

    /**
     * Multiplies Vector3 (as 2 component vector) with a Matrix3
     * @param  {Matrix3} mat The matrix to multiply with
     * @param  {Vector3} vec The vector to multiply
     * @return {Vector3}     The resulting vector
     */
    static mulVec3(mat, vec) {
        const x = mat.m00 * vec.x + mat.m01 * vec.y + mat.m02;// * vec.z;
        const y = mat.m10 * vec.x + mat.m11 * vec.y + mat.m12;// * vec.z;
        //const z = mat.m20 * vec.x  +  mat.m21 * vec.y  +  mat.m22 * vec.z;
        return new Vector3(x, y);
    }

    /**
     * Multiplies mat1 with mat2 (bottom row is excluded)
     * @param  {Matrix3} mat1 
     * @param  {Matrix3} mat2 
     * @return {Matrix3} 
     */
    static mul(mat1, mat2) {
        const out = {};
        out.m00 = mat1.m00 * mat2.m00 + mat1.m01 * mat2.m10 + mat1.m02;// * mat2.m20;
        out.m10 = mat1.m10 * mat2.m00 + mat1.m11 * mat2.m10 + mat1.m12;// * mat2.m20;
        //out.m20 = mat1.m20 * mat2.m00  +  mat1.m21 * mat2.m10  +  mat1.m22 * mat2.m20;

        out.m01 = mat1.m00 * mat2.m01 + mat1.m01 * mat2.m11 + mat1.m02;// * mat2.m21;
        out.m11 = mat1.m10 * mat2.m01 + mat1.m11 * mat2.m11 + mat1.m12;// * mat2.m21;
        //out.m21 = mat1.m20 * mat2.m01  +  mat1.m21 * mat2.m11  +  mat1.m22 * mat2.m21;

        out.m02 = mat1.m00 * mat2.m02 + mat1.m01 * mat2.m12 + mat1.m02;// * mat2.m22;
        out.m12 = mat1.m10 * mat2.m02 + mat1.m11 * mat2.m12 + mat1.m12;// * mat2.m22;
        //out.m22 = mat1.m20 * mat2.m02  +  mat1.m21 * mat2.m12  +  mat1.m22 * mat2.m22;
        return out;
    }

    /**
     * Creates a translation matrix
     * @param {Vector3} translation 
     * @return {Matrix3} 
     */
    static translation(translation) {
        const out = new Matrix3();
        out.m02 = translation.x;
        out.m12 = translation.y;
        return out;
    }

    /**
     * Creates a scaling matrix
     * @param  {Vector3} scale 
     * @return {Matrix3} 
     */
    static scaling(scale) {
        const out = {
            m00: scale.x, m01: 0, m02: 0,
            m10: 0, m11: scale.y, m12: 0,
            m20: 0, m21: 0, m22: 1
        };
        return out;
    }

    /**
     * Creates a matrix that rotates around z-axis by angle
     * @param  {number} angle 
     * @return {Matrix3} 
     */
    static rotation(angle) {
        const sin = Math.sin(angle),
            cos = Math.cos(angle);
        const out = {
            m00: cos, m01: -sin, m02: 0,
            m10: sin, m11: cos, m12: 0,
            m20: 0, m21: 0, m22: 1
        };
        return out;
    }
}




// ENGINE

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

/**
 * All objects (polygons) in the world.
 * @type {Polygon[]}
 */
const polygons = [];

let scale = 1;
let gravity = new Vector3(0, -2.81);
let mousePos = new Vector3();
let debug = false;
let wireframe = false;


// objects in the world are represented as Polygons
class Polygon {

    constructor() {
        this.name = "New Polygon";
        this.color = "#000000";

        /**
         * Object vertices in clockwise order, relative to CM (pivot)
         * @type {Vector3[]}
         */
        this.vertices = [];
        /**
         * Vertices transformed to worldspace.
         * @type {Vector3[]}
         */
        this.worldVerts = [];

        this.position = new Vector3(0); // world space pos of CM, use setPosition() to change this
        this.angle = 0; // in radians, use setAngle() to change this

        this.physics = false; // is this poly affected by physics (still works as a collider)
        this.mass = 1;
        this.moment = 2;
        this.bounciness = 0.5;
        this.velocity = new Vector3(0); // velocity of CM
        this.angularVelocity = new Vector3(0); // has only z component in 2D


        // internally used variables
        this.changed = true; // used to check if worldVerts need updating
        this.appliedForce = new Vector3(0); // used by function addForce()
        this.impulse = new Vector3(0); // used by function addImpulse()
    }

    /**
     * 
     * @param {Vector3} pos 
     */
    setPosition(pos) {
        this.position.set(pos.x, pos.y, pos.z);
        this.changed = true;
    }

    /**
     * 
     * @param {number} angle in radians
     */
    setAngle(angle) {
        this.angle = angle;
        this.changed = true;
    }

    /**
     * Transform the vertices to alter the polygon relative to it's pivot.
     * @param {Vector3} translation 
     * @param {number} rotation 
     * @param {Vector3} scale 
     */
    applyTransformation(translation, rotation, scale) {
        translation ??= { x: 0, y: 0, z: 0 };
        rotation ??= 0;
        scale ??= { x: 1, y: 1, z: 1 };

        const sinA = Math.sin(rotation);
        const cosA = Math.cos(rotation);
        const mRow1 = new Vector3(cosA * scale.x, -sinA, translation.x);
        const mRow2 = new Vector3(sinA, cosA * scale.y, translation.y);
        for (let i = this.vertices.length - 1; i >= 0; i--) {
            const vert = this.vertices[i];
            vert.z = 1; // z must be 1 for the next operation
            this.vertices[i].set(
                vert.dot(mRow1),
                vert.dot(mRow2),
                0
            );
        }
        this.changed = true;
    }

    /**
     * Updates the world space vertices array. Call this after changing position or angle.
     */
    updateWorldVerts() {
        if (!this.changed || this.vertices.length === 0) return;

        let worldVertsCleared = false;
        if (this.worldVerts.length != this.vertices.length) {
            this.worldVerts = [];
            worldVertsCleared = true;
        }
        const sinA = Math.sin(this.angle);
        const cosA = Math.cos(this.angle);
        const matrix = new Matrix3(
            cosA, -sinA, this.position.x,
            sinA, cosA, this.position.y,
        );
        for (let i = 0; i < this.vertices.length; i++) {
            const vert = Matrix3.mulVec3(matrix, this.vertices[i]);
            if (worldVertsCleared) {
                this.worldVerts.push(vert);
            } else {
                this.worldVerts[i] = vert;
            }
        }
        this.changed = false;
    }

    /**
     * 
     * @param {Vector3} force 
     */
    addForce(force) {
        this.appliedForce.set(force.x, force.y);
    }

    /**
     * 
     * @param {Vector3} impulse 
     */
    addImpulse(impulse) {
        this.impulse.set(impulse.x, impulse.y);
    }

    /**
     * Returns point's velocity as part of this polygon
     * @param {Vector3} point 
     * @returns 
     */
    pointVelocity(point) {
        const r_ap = point.sub(this.position);
        return this.velocity.add(this.angularVelocity.cross(r_ap));
    }

    draw() {
        const verts = this.worldVerts;
        if (verts.length === 0) return;
        let vert = verts[0];
        context.beginPath();
        context.moveTo(vert.x, vert.y);
        for (let i = 1; i < verts.length; i++) {
            vert = verts[i];
            context.lineTo(vert.x, vert.y);
        }
        context.closePath();
        if (wireframe) {
            context.strokeStyle = this.color;
            context.lineWidth = 0.1;
            context.stroke();
        } else {
            context.fillStyle = this.color;
            context.fill();
        }
    }
}


function makeRectangle(width, height) {
    const poly = new Polygon();
    const halfX = width / 2;
    const halfY = height / 2;
    poly.vertices.push(new Vector3(halfX, -halfY, 0)); // bottom-right
    poly.vertices.push(new Vector3(-halfX, -halfY, 0)); // bottom-left
    poly.vertices.push(new Vector3(-halfX, halfY, 0)); // top-left
    poly.vertices.push(new Vector3(halfX, halfY, 0)); // top-right
    return poly;
}

function makeCircle(radius, segments) {
    const poly = new Polygon();
    const maxAngle = 2 * Math.PI;
    for (let i = segments - 1; i >= 0; i--) {
        const angle = maxAngle * i / segments;
        poly.vertices.push(new Vector3(radius * Math.cos(angle), radius * Math.sin(angle)));
    }
    // add a small spike to visualize rotation
    //poly.vertices.push(new Vector3(radius+0.5 * Math.cos(0), radius * Math.sin(0)));
    return poly;
}

/**
 * 
 * @param {Vector3} startPos 
 * @param {Vector3} vector 
 * @param {string} color 
 */
function drawVector(startPos, vector, color) {
    context.lineWidth = 0.1;
    context.beginPath();
    context.moveTo(startPos.x, startPos.y);
    context.lineTo(startPos.x + vector.x, startPos.y + vector.y);
    context.closePath();
    context.strokeStyle = color ?? "#FF0000";
    context.stroke();
}

/**
 * @type {{
 *   time: number,
 *   startPos: Vector3,
 *   vector: Vector3,
 *   color: string
 * }[]}
 */
const drawCalls = [];

function drawVector2(startPos, vector, color, time) {
    drawCalls.push({ time: time, startPos: startPos, vector: vector, color: color });
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = polygons.length - 1; i >= 0; i--) {
        // draw a polygon
        polygons[i].draw();
        // draw the center point
        const pos = polygons[i].position;
        context.fillStyle = "white";
        context.fillRect(pos.x - 0.1, pos.y - 0.1, 0.2, 0.2);
    }

    // vector drawCalls, submitted with drawVector2()
    for (let i = drawCalls.length - 1; i >= 0; i--) {
        const call = drawCalls[i];
        drawVector(call.startPos, call.vector, call.color);
        call.time -= 1 / 60;
        if (call.time <= 0) drawCalls.splice(i, 1); // remove the drawCall when time's up
    }
}



// PHYSICS

class Collision {
    /**
     * 
     * @param {Vector3} normal 
     * @param {Vector3} point 
     * @param {number} penetration 
     * @param {Polygon} poly1 
     * @param {Polygon} poly2 
     */
    constructor(normal, point, penetration, poly1, poly2) {
        this.normal = normal;
        this.point = point;
        this.penetration = penetration;
        this.poly1 = poly1;
        this.poly2 = poly2;
    }
}

/**
 * Returns array of collisions (if multiple collisions have happened to the same poly).
 * If no collision, returns empty array
 * @param {Polygon} poly 
 */
function collisionTest(poly) {
    const collisions = [];
    // loop all other polygons
    for (let i = polygons.length - 1; i >= 0; i--) {
        const otherPoly = polygons[i];
        if (otherPoly === poly) continue;

        const max = {}; // point that is the most inside poly
        // test all vertices of the polygon
        for (let j = otherPoly.worldVerts.length - 1; j >= 0; j--) {
            const point = otherPoly.worldVerts[j];
            const result = pointIntersectionTest(point, poly);
            if (result !== false) {
                const edgeV = result.edgeP2.sub(result.edgeP1);
                const n = new Vector3(edgeV.y, -edgeV.x).normalized(); // left hand normal
                // relative velocity check
                // const relVel = otherPoly.velocity.sub(poly.velocity);
                const relVel = poly.pointVelocity(point).sub(otherPoly.pointVelocity(point));
                if (relVel.dot(n) < 0) { // otherPoly is going towards poly
                    if (max.penetration === undefined || result.dist > max.penetration) {
                        max.normal = n;
                        max.point = point;
                        max.penetration = result.dist;
                    }
                }
            }
        }

        if (max.point !== undefined) { // collision has happened
            const point = new Vector3(max.point.x, max.point.y);
            collisions.push(new Collision(max.normal, point, max.penetration, poly, otherPoly));
        }
    }
    return collisions;
}


/**
 * Test if point is inside poly using cross products with the edges.
 * Returns edge and distance from it {dist, edgeP1, edgeP2} or false if not inside poly
 * @param {Vector3} point 
 * @param {Polygon} poly 
 * @returns 
 */
function pointIntersectionTest(point, poly) {
    const min = {}; // edge that is closest to the point
    // TODO: position of the poly the point belongs to should also be checked, currently this does not choose the edge very well near corners
    for (let i = 0; i < poly.worldVerts.length; i++) { // loop through the edges
        const nextVert = (i + 1) % poly.worldVerts.length;
        const edgeP1 = poly.worldVerts[i];
        const edgeP2 = poly.worldVerts[nextVert];

        const P1toP2 = edgeP2.sub(edgeP1); // the edge vector
        const P1toPoint = point.sub(edgeP1); // from edge start to point

        const crossResult = P1toP2.x * P1toPoint.y - P1toPoint.x * P1toP2.y; // 2D cross product

        if (crossResult > 0) { // point is outside (left side positive, right side negative)
            return false;
        }
        const dist = crossResult / -P1toP2.magnitude();
        if (min.dist === undefined || dist < min.dist) {
            min.dist = dist;
            min.edgeP1 = edgeP1;
            min.edgeP2 = edgeP2;
        }
    }
    return min;
}

/**
 * Applies new velocity and angularVelocity to the Polygons involved in a collision
 * @param {Collision} collisionInfo
*/
function collisionResponse(collisionInfo) {
    const poly1 = collisionInfo.poly1, // this poly is indicated with a
        poly2 = collisionInfo.poly2, // this poly is indicated with b
        n = collisionInfo.normal,
        r_ap = collisionInfo.point.sub(poly1.position), // r_ap = point - poly1_CM
        r_bp = collisionInfo.point.sub(poly2.position), // r_bp = point - poly2_CM
        ma = poly1.mass,
        mb = poly2.mass,
        Ja = poly1.moment,
        Jb = poly2.moment,
        va = poly1.velocity,
        wa = poly1.angularVelocity,
        vb = poly2.velocity,
        wb = poly2.angularVelocity;

    const vap = va.add(wa.cross(r_ap)), // collision point's velocity in poly1
        vbp = vb.add(wb.cross(r_bp)), // collision point's velocity in poly2
        vab = vap.sub(vbp); // relative velocity = vap - vbp

    const r_apXn = r_ap.cross(n); // r_ap x n
    const r_bpXn = r_bp.cross(n); // r_bp x n
    const e = (poly1.bounciness + poly2.bounciness) / 2;
    let I = -(1 + e) * (vab.dot(n)) / (1 / ma + 1 / mb + r_apXn.sqrMagnitude() / Ja + r_bpXn.sqrMagnitude() / Jb); // impulse
    I += collisionInfo.penetration; // this is probably not physically accurate but prevents the object from going through floor
    // set new velocities
    poly1.velocity = va.add(n.mul(I / ma));
    poly1.angularVelocity = wa.add(r_apXn.mul(I / Ja));
    poly2.velocity = vb.sub(n.mul(I / mb));
    poly2.angularVelocity = wb.sub(r_bpXn.mul(I / Jb));
}

/**
 * Calculate collisions and forces and update the position and rotation of polygons.
 * @param {number} deltaTime 
 */
function physUpdate(deltaTime) {
    // gather all collisions that have happened
    const collisions = [];
    for (let i = 0; i < polygons.length; i++) {
        collisions.push(...collisionTest(polygons[i]));
    }

    // apply responses to the collisions
    for (let j = collisions.length - 1; j >= 0; j--) {
        const col = collisions[j];
        if (debug) drawVector2(col.point, col.normal, "red", 2);
        collisionResponse(col);
    }

    // update positions and angles
    for (let i = 0; i < polygons.length; i++) {
        const poly = polygons[i];

        if (poly.physics) {
            let accel = poly.appliedForce.div(poly.mass); // for addForce() function
            poly.appliedForce.set(0, 0);
            accel = accel.add(poly.impulse.div(poly.mass * deltaTime)); // for addImpulse() function
            poly.impulse.set(0, 0);
            accel = accel.add(gravity);
            poly.velocity = poly.velocity.add(accel.mul(deltaTime));

            poly.setPosition(poly.position.add(poly.velocity.mul(deltaTime)));
            poly.setAngle(poly.angle + poly.angularVelocity.z * deltaTime);
        }
    }
}

function updatePolygons() {
    for (let i = polygons.length - 1; i >= 0; i--) {
        polygons[i].updateWorldVerts();
    }
}

/**
 * Transforms from pixel coordinates to world coordinates.
 */
let screen2world = new Matrix3();

function resize() {
    canvas.width = innerWidth * scale;
    canvas.height = innerHeight * scale;
    canvas.style.width = innerWidth + 'px';
    canvas.style.height = innerHeight + 'px';
    const s = canvas.height / 50; // camera height 50 units
    // on the canvas y-axis points down by default
    context.transform(s, 0, 0, -s, 0, canvas.height); // flip y-axis and scale
    screen2world = new Matrix3(
        1 / s, 0, 0,
        0, 1 / -s, canvas.height / s,
        0, 0, 1
    );

    draw();
}

function createObjects() {

    // floor
    const floor = makeRectangle(1000, 10);
    floor.name = "Floor";
    floor.mass = Infinity;
    floor.moment = Infinity;
    floor.bounciness = 1;
    polygons.push(floor);

    // right wall
    const wallRight = makeRectangle(10, 1000);
    wallRight.setPosition({ x: 80 });
    wallRight.name = "WallRight";
    wallRight.mass = Infinity;
    wallRight.moment = Infinity;
    wallRight.bounciness = 1;
    polygons.push(wallRight);

    // left wall
    const wallLeft = makeRectangle(2, 1000);
    wallLeft.name = "WallLeft";
    wallLeft.mass = Infinity;
    wallLeft.moment = Infinity;
    wallLeft.bounciness = 1;
    polygons.push(wallLeft);


    // a triangle
    const triangle = new Polygon();
    triangle.name = "Triangle";
    triangle.color = "green";
    triangle.vertices.push(new Vector3(-1, -2));
    triangle.vertices.push(new Vector3(-1, 3));
    triangle.vertices.push(new Vector3(1, 1));
    triangle.applyTransformation({ x: 0.3, y: -0.5 }); // move pivot a bit
    triangle.applyTransformation(0, 0, { x: 2, y: 1 }); // scale a bit
    triangle.setPosition({ x: 10, y: 30 });
    triangle.setAngle(-0.3);
    triangle.physics = true;
    triangle.mass = 1;
    triangle.moment = 10;
    triangle.bounciness = 0.5;
    triangle.addImpulse({ x: 10, y: 0 });
    polygons.push(triangle);

    // box 2
    const box2 = makeRectangle(5, 4);
    box2.name = "Box2";
    box2.color = "yellow";
    box2.setPosition({ x: 25, y: 40 });
    box2.setAngle(0.5);
    box2.physics = true;
    box2.moment = 10;
    box2.addImpulse({ x: -8, y: -8 });
    polygons.push(box2);

    // big box
    const box = makeRectangle(5, 3);
    box.name = "Box";
    box.color = "blue";
    box.applyTransformation(0, 0, { x: 3, y: 3 });
    box.setPosition({ x: 65, y: 10 });
    //box.setAngle(0.3);
    box.physics = true;
    box.mass = 15;
    box.moment = 100;
    //box.addImpulse({ x: -10, y: 0 });
    polygons.push(box);

    // ball
    const ball = makeCircle(3, 32);
    ball.name = "Ball";
    ball.color = "red";
    ball.setPosition({ x: 70, y: 18 });
    ball.physics = true;
    ball.moment = 5;
    ball.addImpulse({ x: -2, y: 0 });
    polygons.push(ball);

}

function onMouseDown(event) {
    for (let i = polygons.length - 1; i >= 0; i--) {
        const pos = polygons[i].position;
        const force = mousePos.sub(pos).normalized().mul(5);
        polygons[i].addImpulse(force);
    }
}

function onKeyPress(event) {
    switch (event.key) {
        case " ": // toggle pause
            if (!playing) play();
            else pause();
            break;
        case "s": // step frame
            step();
            break;
        case "w": // toggle wireframe
            wireframe = !wireframe;
            break;
        case "d": // toggle debug
            debug = !debug;
            break;
        case "+": // add gravity
            gravity.y += 1;
            break;
        case "-": // lower gravity
            gravity.y -= 1;
            break;
        case "c": // create a 5-gon at mouse position
            {
                const poly = makeCircle(3, 5);
                poly.physics = true;
                poly.setPosition(mousePos);
                polygons.push(poly);
                break;
            }
    }
}


let playing = true;

function update() {
    const deltaTime = 1 / 60;

    updatePolygons();
    physUpdate(deltaTime);
    draw();

    if (playing) requestAnimationFrame(update);
}

function play() {
    playing = true;
    requestAnimationFrame(update);
}

function pause() {
    playing = false;
}

function step() {
    update();
}

function init() {
    canvas.style.display = 'block';
    canvas.onmousemove = function (event) {
        mousePos.x = event.pageX * scale;
        mousePos.y = event.pageY * scale;
        mousePos = Matrix3.mulVec3(screen2world, mousePos);
    };
    canvas.onmouseout = canvas.onmouseleave = function () {
        mousePos.x = mousePos.y = undefined;
    };
    canvas.onmousedown = onMouseDown;
    window.onresize = resize;
    resize();

    createObjects();

    console.log("Initialized");
    update();
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keypress', onKeyPress);













// ADDITIONAL EXPERIMENTATION

// TODO: work in progress

/**
 * Collision test using Separating axis theorem (SAT).
 * Returns array of collisions found against the poly.
 * @param {Polygon} poly 
 * @returns 
 */
function collisionTestSAT(poly) {
    // Separating axis theorem:
    // choose an edge of the first polygon
    // get the normal of the edge
    // take dot product of each of poly1's vertices with the normal and get the max and min result
    // do same to poly2's vertices
    // compare overlap using the min&max of the 2 results: overlapping if poly1min <= poly2max AND poly2min <= poly1max
    // overlap size =
    // if(poly1min <= poly2min) size = poly2min - poly1max
    // else size = poly1min - poly2max
    // if they DON'T overlap, the check has finished and no collision has happened
    // else continue and repeat for each edge until a gap is detected. if all edges result in
    // an overlap, A COLLISION HAS OCCURRED
    // the collision normal is the normal that had the smallest overlap

    const edges = []; // contains normal of each edge of the poly and the bounds of the poly on that normal
    const vertCount = poly.worldVerts.length;
    for (let i = 0; i < vertCount; i++) { // loop through the edges
        const nextVert = (i + 1) % vertCount;
        const edgeP1 = poly.worldVerts[i];
        const edgeP2 = poly.worldVerts[nextVert];
        const edgeV = edgeP2.sub(edgeP1);
        const normal = new Vector3(edgeV.y, -edgeV.x); // left hand normal (vertices are in clockwise order)

        // project vertices of the poly to the normal
        const min = { point: poly.worldVerts[0], proj: undefined }; // lower bound of the poly projected on normal
        const max = { point: poly.worldVerts[0], proj: undefined }; // higher bound of the poly projected on normal
        for (let j = 0; j < vertCount; j++) {
            const proj = poly.worldVerts[j].dot(normal) / normal.sqrMagnitude(); // should this be divided with sqrLen of normal because it is not unit vector?
            if (min.proj === undefined || proj < min.proj) {
                min.proj = proj;
                min.point = poly.worldVerts[j];
            }
            if (max.proj === undefined || proj > max.proj) {
                max.proj = proj;
                max.point = poly.worldVerts[j];
            }
        }
        edges.push({ normal: normal, min: min, max: max });
    }

    // project vertices of other polys in the world to the normals and test against the bounds of this poly
    // add possible collisions to the array
    const collisions = []; // one possible collision per another poly in the world is added to this array
    for (let i = polygons.length - 1; i >= 0; i--) {
        const otherPoly = polygons[i];
        if (otherPoly === poly) continue;
        const vertCount2 = otherPoly.worldVerts.length;

        const min = {}; // smallest overlap, what normal it occured on and what should the contact point be
        // loop through the edges of poly
        for (let j = edges.length - 1; j >= 0; j--) {
            const edge = edges[j];

            // get bounds on edge.normal
            const min2 = { point: otherPoly.worldVerts[0], proj: undefined };
            const max2 = { point: otherPoly.worldVerts[0], proj: undefined };
            for (let k = 0; k < vertCount2; k++) {
                const proj2 = otherPoly.worldVerts[k].dot(edge.normal) / edge.normal.sqrMagnitude(); // should this be divided with sqrLen of normal because it is not unit vector?
                if (min2.proj === undefined || proj2 < min2.proj) {
                    min2.proj = proj2;
                    min2.point = otherPoly.worldVerts[k];
                }
                if (max2.proj === undefined || proj2 > max2.proj) {
                    max2.proj = proj2;
                    max2.point = otherPoly.worldVerts[k];
                }
            }
            // get overlap
            const max0 = Math.max(edge.max.proj, max2.proj);
            const min0 = Math.min(edge.min.proj, min2.proj);
            const w1 = edge.max.proj - edge.min.proj;
            const w2 = max2.proj - min2.proj;
            const overlap = (w1 + w2) - (max0 - min0); // combined width - total range width (negative means a gap)

            // if(edge.min.proj <= min2.proj) overlap = min2.proj - edge.max.proj;
            // else overlap = edge.min.proj - max2.proj;

            if (overlap < 0) { // there's a gap between the polys, no collision
                break;
            }

            if (min.overlap === undefined || overlap < min.overlap) {
                min.overlap = overlap;
                min.normal = edge.normal;
                // this is harder to calculate, see: http://www.dyn4j.org/2011/11/contact-points-using-clipping/
                min.point = min2.point; //FIXME how to calculate this? points that we currently have: edge.min.point, edge.max.point, min2.point or max2.point
            }
        }

        if (min.overlap !== undefined) {
            min.normal = min.normal.normalized();
            collisions.push(new Collision(min.normal, min.point, min.overlap, poly, otherPoly));
        }
    }
    return collisions;
}

/**
 * V1 of collisionTest.
 * Returns array of collisions found against the poly.
 * @param {Polygon} poly 
 * @returns 
 */
function collisionTestV1(poly) {
    const collisions = [];
    // loop all other polygons
    for (let i = polygons.length - 1; i >= 0; i--) {
        const otherPoly = polygons[i];
        if (otherPoly === poly) continue;

        const max = {}; // point that is the most inside poly
        // test all vertices of the polygon
        for (let j = otherPoly.worldVerts.length - 1; j >= 0; j--) {
            const point = otherPoly.worldVerts[j];
            const result = pointIntersectionTest(point, poly);
            if (result !== false) {
                if (max.penetration === undefined || result.dist > max.penetration) {
                    max.penetration = result.dist;
                    max.edgeP1 = result.edgeP1;
                    max.edgeP2 = result.edgeP2;
                    max.point = point;
                }
            }
        }

        if (max.point !== undefined) { // collision has happened
            const edgeV = max.edgeP2.sub(max.edgeP1);
            const n = new Vector3(edgeV.y, -edgeV.x).normalized(); // left hand normal
            // relative velocity check
            // const relVel = otherPoly.velocity.sub(poly.velocity);
            const relVel = poly.pointVelocity(max.point).sub(otherPoly.pointVelocity(max.point));
            if (relVel.dot(n) < 0) { // otherPoly is going towards poly
                const point = new Vector3(max.point.x, max.point.y);
                collisions.push(new Collision(n, point, max.penetration, poly, otherPoly));
            }
        }
    }
    return collisions;
}

/**
 * Simple floor collision test.
 * If no collision, returns false.
 * @param {Polygon} poly 
 * @param {number} floorHeight 
 * @returns 
 */
function floorCollisionTest(poly, floorHeight) { // if multiple vertices have gone through this will fail
    const max = { point: poly.worldVerts[0], penetration: 0 }; // negative penetration means that no collision has happened
    for (let i = poly.worldVerts.length - 1; i >= 0; i--) {
        const vert = poly.worldVerts[i];
        const penetration = floorHeight - vert.y;
        if (penetration > max.penetration) {
            max.point = vert;
            max.penetration = penetration;
        }
        // if (vert.y < floorHeight && poly.pointVelocity(vert).y < 0) { // the vertex has gone through the floor and is travelling towards it
        //   const n = new Vector3(0, 1);
        //   const cP = new Vector3(vert.x, vert.y);
        //   drawVector2(cP, n, "red", 2); // debug draw the normal at the collisionPoint
        //   return new Collision(n, cP, poly, floorPoly);
        // }
    }
    if (max.penetration > 0) {
        const n = new Vector3(0, 1);
        const vert = max.point;
        const cP = new Vector3(vert.x, vert.y);
        return new Collision(n, cP, max.penetration, poly, floorPoly);
    }

    return false;
}

const floorPoly = new Polygon();
floorPoly.mass = Infinity;
floorPoly.moment = Infinity;
floorPoly.bounciness = 1;
