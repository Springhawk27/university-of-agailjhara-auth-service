## Live Link:

https://university-of-agailjhara-auth.vercel.app/

example:
https://university-of-agailjhara-auth.vercel.app/api/v1/students
(Fetch All Students)

## API End Points:

### user:

- api/v1/users/create-student (POST)

- student:

  - api/v1/students/ (GET) [All]

- api/v1/students/:id (GET)
  - example: api/v1/students/210100001 (GET)

### Academic Semester:

- api/v1/academic-semesters/create-semester/ (POST)

- api/v1/academic-semesters/ (GET) [All]

- api/v1/academic-semesters/:id (GET)

  - example: api/v1/academic-semesters/64874a0c9d8c012827577571

- api/v1/academic-semesters/:id (PATCH)

  - example: api/v1/academic-semesters/64874a0c9d8c012827577571

- api/v1/academic-semesters/:id (DELETE)

  - example: api/v1/academic-semesters/64874a0c9d8c012827577571

- Search Semester (paginated)

  - api/v1/academic-semesters/?searchTerm=2021

- Filter semester (paginated) (exact match)
  - api/v1/academic-semesters/?limit=3&title=Autumn&year=2021

### Academic Departments:

- api/v1/academic-departments/create-department/ (POST)

- api/v1/academic-departments/ (GET) [All]

- api/v1/academic-departments/:id (GET)

  - example: api/v1/academic-departments/6489ce6d9755897972abb090

- api/v1/academic-departments/:id (PATCH)

  - example: api/v1/academic-departments/6489ce6d9755897972abb090

- api/v1/academic-departments/:id (DELETE)

  - example: api/v1/academic-departments/6489ce6d9755897972abb090

- Search departments (paginated)

  - api/v1/academic-departments/?searchTerm=engineering

- Filter departments (paginated) (exact match)

  - api/v1/academic-departments/?title=Department of Electrical Engineering

### Academic Faculty:

- api/v1/academic-faculties/create-faculty/ (POST)

- api/v1/academic-faculties/ (GET) [All]

- api/v1/academic-faculties/:id (GET)

  - example: api/v1/academic-faculties/648c81250d239e9f09dabc6d

- api/v1/academic-faculties/:id (PATCH)

  - example: api/v1/academic-faculties/648c81250d239e9f09dabc6d

- api/v1/academic-faculties/:id (DELETE)

  - example: api/v1/academic-faculties/648c81250d239e9f09dabc6d

- Search faculties (paginated)

  - api/v1/academic-faculties/?searchTerm=engineering

- Filter faculties (paginated) (exact match)
  - api/v1/academic-faculties/?title=Faculty of Engineering
