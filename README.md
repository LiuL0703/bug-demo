## Bug-Demo

Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

## Solution
this is a duplicate React instances problem.<br/>
relative issues:
+ https://reactjs.org/warnings/invalid-hook-call-warning.html
+ https://github.com/facebook/react/issues/13991
+ https://github.com/facebook/react/issues/15315

this repo has fixed this problem. see more in `fix` branch or [MicroFE-React-Example](https://github.com/LiuL0703/MicroFE-React-Example)
