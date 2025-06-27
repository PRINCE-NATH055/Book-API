#  From Manual Testing to AI-Powered API Testing with Keploy

##  Introduction

As a beginner working on a full-stack project, I built a **Book Manager API** using **Node.js**, **Express**, and **MySQL**. Like many students, I started testing my APIs manually using **Postman** and writing unit/integration tests using **Jest**. It worked, but it was slow, repetitive, and error-prone.

That’s when I discovered **Keploy**, an AI-powered API testing platform — and everything changed.

---

##  Project Context

**Project**: Book Manager  
**Stack**:
- Backend: Node.js + Express
- Database: MySQL
- Testing: Jest + Supertest + Keploy
- CI/CD: GitHub Actions

APIs Supported:
- `GET /api/books`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

---

##  The Pain of Manual Testing

Manually testing each endpoint in Postman and writing test cases in Jest for all CRUD operations took a lot of time. Every time I modified a route or DB schema, I had to update my test code too. Achieving high test coverage felt like a mountain to climb.

---

##  Discovering Keploy: AI-Powered API Testing

Keploy lets you **record actual API requests/responses** made during usage and turns them into structured, replayable test cases.

Here’s how simple it was:

```bash
keploy record -c "node server.js" --disable-cloud
```

Then I hit my APIs using Postman:

- `POST /api/books`
- `GET /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

Keploy captured those requests and generated `.yaml` test files inside `keploy/test-reports/`. It was magical to see my real traffic converted into repeatable tests automatically.

---

##  Replaying the Tests

After recording, I ran:

```bash
keploy test -c "node server.js" --delay 10
```

And boom — Keploy tested my API based on previously recorded traffic and validated actual vs expected responses. I didn't have to write assertions or mock DB manually!

---

##  From 0 to 100% Test Coverage

After integrating with Keploy and writing minimal unit/integration tests for edge cases, I achieved:

-  100% Statements Coverage
-  100% Branches Coverage
-  100% Functions Coverage
-  100% Lines Covered

All visible in the terminal and coverage report:

![Coverage Report](./Testing_coverage_output.png)

---

##  CI/CD with GitHub Actions

I integrated Keploy into my CI pipeline using GitHub Actions:

```yaml
- name: Run Keploy Tests
  run: |
    keploy test-suite --path keploy/test-reports/ --delay 10 --port 5000
```

Now every push automatically runs all my API tests in GitHub, just like this:

![GitHub Actions](./FrontEnd_Interface.png)

---

##  What I Liked About Keploy

-  Super quick to set up
-  AI auto-generates test cases based on real usage
-  Tests are environment-independent YAML files
-  No mocking required
-  Easily integrates with CI/CD

---

##  Final Thoughts

Keploy turned API testing into something that felt magical. For the first time, I wasn’t writing tests — I was just **using my app**, and Keploy did the rest.

As a student, tools like this help bridge the gap between learning and building production-level workflows.

If you’re tired of repetitive test writing and want to focus on real development, **try Keploy — it might surprise you**.

---

## 🔗 Links

- GitHub Repo: [Book-Manager-API](https://github.com/PRINCE-NATH055/Book-API)
- Project Demo: `http://localhost:5000` (locally run)

---

