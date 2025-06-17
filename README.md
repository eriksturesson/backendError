# backend-error

![npm](https://img.shields.io/npm/v/backend-error)
![downloads](https://img.shields.io/npm/dm/backend-error)
![license](https://img.shields.io/npm/l/backend-error)

`backend-error` is a lightweight Node.js / TypeScript utility that formats all errors—custom or native—into standardized HTTP responses with correct status codes and user-friendly messages. The `httpErrorFormatter` ensures secure, consistent error output by controlling what is exposed to the frontend.

---

## 📦 Installation

```bash
npm install backend-error
```

---

## 🚀 Throw `BackendError`, catch with `httpErrorFormatter`

```ts
import { BackendError, httpErrorFormatter } from "backend-error";

app.post("/signup", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    const { email, id } = req.body;
    if (!auth) throw BackendError.Unauthorized("Missing auth token"); // 401, showUser:true
    if (!email) throw BackendError.BadRequest("Email is required"); // 400, showUser:true
    const user = await getUser(req.params.id);
    if (!user) throw BackendError.NotFound("User not found"); // 404, showUser:true

    // Normal logic...
  } catch (err) {
    const { status, body } = httpErrorFormatter(err); // Handles BackendError and native Error safely
    res.status(status).json(body);
  }
});
```

✅ No manual showUser checks — handled automatically by the formatter  
✅ Returns generic 500 for critical or unknown errors (or if `showUser` is false)  
✅ Formatter supports both BackendError instances and native Error objects

> The httpErrorFormatter inspects any error, formats it consistently, and decides what message is safe to show to users.

---

## ✨ Custom BackendError creation

If you prefer, create your own error with full control including custom metadata:

```ts
const error = new BackendError({
  message: "Something went wrong",
  severity: "critical",
  showUser: true,
  code: 500,
  data: { context: "PaymentService", id: 12345 },
});
```

### Selected BackendError options

- `message`: Error message
- `code`: HTTP status code
- `showUser`: Whether to expose the message to frontend clients
- `severity`: "info" | "warning" | "error" | "critical"
- `data`: Optional metadata

---

## ⚙️ Static error helpers

```ts
BackendError.BadRequest("..."); // 400, showUser: true
BackendError.Unauthorized("..."); // 401, showUser: true
BackendError.Forbidden("..."); // 403, showUser: true
BackendError.NotFound("..."); // 404, showUser: true
BackendError.Conflict("..."); // 409, showUser: true
BackendError.UnprocessableEntity("..."); // 422, showUser: true
BackendError.Internal("..."); // 500, showUser: false
BackendError.ServiceUnavailable("..."); // 503, showUser: false
```

---

## 🧠 Manual error handling (if not using `httpErrorFormatter`)

```ts
import { BackendError } from "backend-error";

app.get("/user/:id", async (req, res) => {
  try {
    const user = null;
    if (!user) throw BackendError.NotFound("User not found");
    res.json(user);
  } catch (err) {
    if (err instanceof BackendError && err.showUser) {
      res.status(err.code ?? 400).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
```

---

## 🧩 Types

```ts
export type Severity = "info" | "warning" | "error" | "critical";

export interface BackendErrorOptions {
  message: string;
  isOperational?: boolean;
  showUser?: boolean;
  severity?: Severity;
  code?: number;
  data?: any;
}
```

---

## 🎨 Works well with [error-drawings](https://www.npmjs.com/package/error-drawings)

![GitHub package.json version (master)](https://img.shields.io/github/package-json/v/eriksturesson/errorDrawings/master)
![npm downloads](https://img.shields.io/npm/dy/error-drawings?label=npm%20downloads)

```bash
npm install error-drawings
```

Use for dev-friendly terminal logs — with a bit of dramatic flair for critical errors:

```ts
import { BackendError, httpErrorFormatter } from "backend-error";
import drawLog from "error-drawings";

try {
  throw BackendError.Forbidden("No access to resource");
} catch (err) {
  const isCritical = !(err instanceof BackendError && err.isOperational) || err.code >= 500;
  if (isCritical) drawLog(err); // Dramatic terminal art for critical errors!

  const { status, body } = httpErrorFormatter(err);
  res.status(status).json(body);
}
```

---

## 🌐 Repo

[GitHub](https://github.com/eriksturesson/backendError)

Created by [@eriksturesson](https://eriksturesson.se)
