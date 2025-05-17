import { Flashcard, Subject, Chapter } from './types';

export const subjects: Subject[] = [
  {
    id: 'math',
    name: 'Mathematics',
    chapters: [
      { id: 'algebra', name: 'Algebra', subjectId: 'math' },
      { id: 'geometry', name: 'Geometry', subjectId: 'math' },
      { id: 'calculus', name: 'Calculus', subjectId: 'math' },
    ]
  },
  {
    id: 'Physics',
    name: 'Physics',
    chapters: [
      { id: 'Mechanics', name: 'Mechanics', subjectId: 'Physics' },
      { id: 'Electricity', name: 'Electricity', subjectId: 'Physics' },
      { id: 'Magnetism', name: 'Magnetism', subjectId: 'Physics' },
    ]
  },
  {
    id: 'DSA',
    name: 'DSA',
    chapters: [
      { id: 'DP', name: 'Dynamic Programming', subjectId: 'DSA' },
      { id: 'Greedy_Methods', name: 'Greedy Methods', subjectId: 'DSA' },
      { id: 'Recursion', name: 'Recursion', subjectId: 'DSA' },
    ]
  }
];

export const flashcards: Flashcard[] = [
  {
    id: '1',
    question: 'State the Pythagorean theorem and explain its application in geometry.',
    answer: 'In a right triangle, the square of the length of the hypotenuse equals the sum of the squares of the lengths of the other two sides. (a² + b² = c²)',
    known: false,
    subjectId: 'math',
    chapterId: 'geometry'
  },
  {
    id: '2',
    question: 'Explain the quadratic formula and when it is used in algebraic problems.',
    answer: 'For a quadratic equation ax² + bx + c = 0, the solutions are x = (-b ± √(b² - 4ac)) / 2a',
    known: false,
    subjectId: 'math',
    chapterId: 'algebra'
  },
  {
    id: '3',
    question: 'What is the derivative of sin(x) with respect to x and how is it derived?',
    answer: 'The derivative of sin(x) is cos(x)',
    known: false,
    subjectId: 'math',
    chapterId: 'calculus'
  },
  {
    id: '4',
    question: "Explain Newton's First Law of Motion and provide an everyday example.",
    answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Mechanics'
  },
  {
    id: '5',
    question: "Define Ohm's Law and explain its significance in electrical circuits.",
    answer: "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points. I = V/R where I is current, V is voltage, and R is resistance.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Electricity'
  },
  {
    id: '6',
    question: "Explain the relationship between electricity and magnetism according to electromagnetic theory.",
    answer: "Electricity and magnetism are fundamentally connected - a changing electric field creates a magnetic field, and a changing magnetic field creates an electric field. This relationship forms the basis of electromagnetic waves and many modern technologies.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Magnetism'
  },
  {
    id: '7',
    question: "What is the time complexity of the Fibonacci solution using Dynamic Programming and why is it better than the naive recursive approach?",
    answer: "The DP solution for Fibonacci has O(n) time complexity, vastly better than the O(2^n) exponential time of the naive recursive solution. It uses memoization to avoid redundant calculations of the same subproblems.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'DP'
  },
  {
    id: '8',
    question: "Explain the activity selection problem and how a greedy algorithm solves it optimally.",
    answer: "The activity selection problem involves selecting the maximum number of non-overlapping activities. The greedy approach sorts activities by finish time and selects the activity with earliest finish time, then continues with compatible activities, achieving optimal results in O(n log n) time.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'Greedy_Methods'
  },
  {
    id: '9',
    question: "What is the base case in recursion and why is it critical for preventing infinite recursion?",
    answer: "A base case is a condition that stops the recursion. It's critical because without it, the recursive function would call itself indefinitely, causing a stack overflow. Every recursive algorithm must have at least one base case and make progress toward it.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'Recursion'
  },
  {
    id: '10',
    question: "Explain Dijkstra's algorithm and why it doesn't work with negative edge weights.",
    answer: "Dijkstra's algorithm finds the shortest path in a weighted graph from a source node to all other nodes. It greedily selects the unvisited vertex with the smallest tentative distance. It fails with negative edges because once a vertex is marked as 'visited', its distance is considered final, but negative edges could later provide a shorter path.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'Greedy_Methods'
  },
  {
    id: '11',
    question: "Describe the Floyd-Warshall algorithm and its time complexity.",
    answer: "Floyd-Warshall is a dynamic programming algorithm that finds shortest paths between all pairs of vertices in a weighted graph, even with negative edges (but no negative cycles). It works by incrementally improving an estimate on the shortest path between two vertices by considering intermediate vertices. Time complexity is O(V³) where V is the number of vertices.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'DP'
  },
  {
    id: '12',
    question: "Explain the 0/1 Knapsack problem and how dynamic programming solves it.",
    answer: "The 0/1 Knapsack problem involves selecting items with weights and values to maximize total value while keeping total weight under a limit. Unlike greedy approaches, DP builds a table where dp[i][w] represents the maximum value possible using the first i items with weight limit w. Time complexity is O(nW) where n is the number of items and W is the weight capacity.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'DP'
  },
  {
    id: '13',
    question: "What is the Master Theorem and how is it used to solve recurrence relations?",
    answer: "The Master Theorem provides a method for solving recurrence relations of the form T(n) = aT(n/b) + f(n), where a ≥ 1, b > 1, and f(n) is an asymptotic function. It has three cases based on comparing f(n) with n^(log_b a), resulting in different asymptotic bounds for T(n). It's commonly used to analyze divide-and-conquer algorithms.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'Recursion'
  },
  {
    id: '14',
    question: "In a projectile motion with initial velocity u at angle θ, derive the formula for maximum height and time of flight.",
    answer: "Maximum height h = u²sin²θ/2g and time of flight T = 2usinθ/g, where u is initial velocity, θ is the angle with horizontal, and g is acceleration due to gravity. These are derived from the vertical component of motion equations: v = usinθ - gt and y = usinθ·t - (1/2)gt².",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Mechanics'
  },
  {
    id: '15',
    question: "A 2kg block slides down a frictionless inclined plane with angle 30°. Calculate its acceleration and the time taken to slide 8m along the plane.",
    answer: "For a block on a frictionless inclined plane at angle θ: Acceleration a = g·sinθ = 9.8·sin30° = 4.9 m/s². With constant acceleration, time t = √(2s/a) = √(2·8/4.9) = 1.81 seconds to travel 8m along the plane.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Mechanics'
  },
  {
    id: '16',
    question: "In an LC circuit with inductance L = 20 mH and capacitance C = 50 μF, calculate the resonant frequency and maximum energy stored if the peak voltage is 5V.",
    answer: "Resonant frequency f = 1/(2π√(LC)) = 1/(2π√(20×10⁻³×50×10⁻⁶)) = 159.15 Hz. Maximum energy stored in the capacitor E = (1/2)CV² = (1/2)×50×10⁻⁶×5² = 625 μJ, which equals the maximum energy stored in the inductor at resonance.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Electricity'
  },
  {
    id: '17',
    question: "Evaluate the integral: ∫(x²+1)/(x⁴+x²) dx",
    answer: "∫(x²+1)/(x⁴+x²) dx = ∫(1/x² + 1/(x⁴+x²)) dx = -1/x + (1/2)∫(1/(x²)(1+x²)) dx = -1/x + (1/2)ln|x|/(1+x²) + C, where C is the constant of integration.",
    known: false,
    subjectId: 'math',
    chapterId: 'calculus'
  },
  {
    id: '18',
    question: "If A and B are two events such that P(A) = 0.6, P(B) = 0.3, and P(A∩B) = 0.2, find P(A|B) and determine if the events are independent.",
    answer: "P(A|B) = P(A∩B)/P(B) = 0.2/0.3 = 2/3. For independence, we need P(A∩B) = P(A)·P(B), but 0.2 ≠ 0.6×0.3 = 0.18. Therefore, the events are not independent.",
    known: false,
    subjectId: 'math',
    chapterId: 'algebra'
  },
  {
    id: '19',
    question: "Explain the Bellman-Ford algorithm and how it differs from Dijkstra's algorithm.",
    answer: "Bellman-Ford finds shortest paths from a source vertex to all others, even with negative edge weights (detecting negative cycles). It relaxes all edges V-1 times, with time complexity O(VE). Unlike Dijkstra's algorithm, it can handle negative edge weights, but is slower (Dijkstra's is O(E + V log V) with a priority queue).",
    known: false,
    subjectId: 'DSA',
    chapterId: 'DP'
  },
  {
    id: '20',
    question: "Explain the concept of a topological sort and its application in dependency resolution.",
    answer: "A topological sort of a directed graph is a linear ordering of its vertices such that for every directed edge (u, v), vertex u comes before v in the ordering. It's only possible in directed acyclic graphs (DAGs). Applications include task scheduling, dependency resolution in build systems, and course prerequisites planning. It can be implemented using DFS with O(V+E) time complexity.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'Greedy_Methods'
  },
  {
    id: '21',
    question: "What is the Longest Common Subsequence (LCS) problem and how is it solved using dynamic programming?",
    answer: "LCS is the problem of finding the longest subsequence common to two sequences. Unlike substrings, subsequences don't need to be consecutive elements. DP approach: create a table where LCS[i][j] represents the length of LCS for first i characters of string A and first j of string B. If characters match, LCS[i][j] = 1 + LCS[i-1][j-1]; else, LCS[i][j] = max(LCS[i-1][j], LCS[i][j-1]). Time complexity: O(m*n).",
    known: false,
    subjectId: 'DSA',
    chapterId: 'DP'
  },
  {
    id: '22',
    question: "What is tail recursion and why is it more efficient than regular recursion?",
    answer: "Tail recursion is a special case where the recursive call is the last operation in the function (nothing is done after the recursive call). It's more efficient because many compilers optimize it into iteration, eliminating the overhead of maintaining a call stack for each recursive call. This avoids stack overflow for deep recursions and improves performance by reusing stack frames instead of creating new ones.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'Recursion'
  },
  {
    id: '23',
    question: "A ball is thrown horizontally at 15 m/s from the top of a 20m high building. Calculate the time taken to reach the ground and the horizontal distance traveled.",
    answer: "Using vertical motion: h = (1/2)gt², so time t = √(2h/g) = √(2×20/9.8) = 2.02s. Horizontal motion is at constant velocity, so distance d = vt = 15×2.02 = 30.3m. The ball will hit the ground 30.3m away from the building after 2.02s.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Mechanics'
  },
  {
    id: '24',
    question: "Derive the induced EMF in a circular loop of radius r that is placed in a time-varying magnetic field B = B₀sin(ωt) perpendicular to its plane.",
    answer: "By Faraday's law, EMF ε = -dΦ/dt, where Φ is the magnetic flux through the loop. Φ = B·A = B₀sin(ωt)·πr². Therefore, ε = -d/dt[B₀sin(ωt)·πr²] = -B₀ωcos(ωt)·πr². This shows the induced EMF is 90° out of phase with the magnetic field and proportional to the frequency ω and area of the loop.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Magnetism'
  },
  {
    id: '25',
    question: "A solenoid of length 30cm has 500 turns and carries a current of 2A. Calculate the magnetic field inside the solenoid and the magnetic energy stored if its cross-sectional area is 5cm².",
    answer: "Magnetic field inside a solenoid B = μ₀nI, where n = N/L is turns per unit length. B = 4π×10⁻⁷ × (500/0.3) × 2 = 4.19×10⁻³ T. Magnetic energy density is u = B²/(2μ₀), so energy stored is U = u×volume = B²A×L/(2μ₀) = (4.19×10⁻³)² × 5×10⁻⁴ × 0.3/(2×4π×10⁻⁷) = 2.2×10⁻³ J.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Magnetism'
  },
  {
    id: '26',
    question: "Solve the differential equation dy/dx + 2xy = x with the initial condition y(0) = 1.",
    answer: "This is a first-order linear differential equation of form dy/dx + P(x)y = Q(x) where P(x) = 2x and Q(x) = x. Using the integrating factor method: I.F. = e^∫P(x)dx = e^∫2xdx = e^(x²). Multiplying both sides: e^(x²)·dy/dx + 2x·e^(x²)·y = x·e^(x²). Left side is d/dx[e^(x²)·y], so d/dx[e^(x²)·y] = x·e^(x²). Integrating: e^(x²)·y = ∫x·e^(x²)dx = (1/2)e^(x²) + C. Thus y = 1/2 + C·e^(-x²). Using y(0)=1: C = 1/2, so y = 1/2 + (1/2)·e^(-x²).",
    known: false,
    subjectId: 'math',
    chapterId: 'calculus'
  },
  {
    id: '27',
    question: "Find the area enclosed by the curves y = x² and y = 2x.",
    answer: "Solving x² = 2x gives intersection points at x = 0 and x = 2. The area between the curves is ∫₀²(2x - x²)dx = [x² - x³/3]₀² = 4 - 8/3 = 4/3 square units.",
    known: false,
    subjectId: 'math',
    chapterId: 'calculus'
  },
  {
    id: '28',
    question: "Explain the concept of a minimum spanning tree (MST) and describe Kruskal's algorithm for finding it.",
    answer: "A minimum spanning tree is a subset of edges from a connected, undirected graph that forms a tree including all vertices with minimum possible total edge weight. Kruskal's algorithm finds MST by: 1) Sorting all edges by weight, 2) Starting with empty MST, 3) Adding next lightest edge that doesn't create a cycle, 4) Continuing until n-1 edges are added. It uses disjoint-set data structure for cycle detection and has O(E log E) time complexity where E is number of edges.",
    known: false,
    subjectId: 'DSA',
    chapterId: 'Greedy_Methods'
  },
  {
    id: '29',
    question: "In a simple harmonic oscillator with mass m attached to a spring of constant k, derive the formula for period of oscillation and energy conservation.",
    answer: "For SHM, the restoring force F = -kx leads to the differential equation m·d²x/dt² = -kx. This gives x = A·cos(ωt+φ) where ω = √(k/m) is angular frequency. The period is T = 2π/ω = 2π√(m/k). For energy conservation, total energy E = KE + PE = (1/2)mv² + (1/2)kx² = (1/2)kA² remains constant, where A is amplitude. KE and PE interconvert during oscillation, but their sum remains fixed.",
    known: false,
    subjectId: 'Physics',
    chapterId: 'Mechanics'
  }
];
