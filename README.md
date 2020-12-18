# Santa Clara COVID test bot
Node.js script to repeatedly poll for an open COVID test appointment from Fulgent in Santa Clara County until one opens up.

# Usage
```sh
node index.js [date]
```
where date is a `YYYY-MM-DD` formatted date. if date is not provided, uses the current day.
