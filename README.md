This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, init your Node version to version for the project:

```bash
nvm use
```

Second, create an .env file by copying .env.example:

```bash
cp .env.example .env
```

**Attention: we work only with `yarn`**\
Thirdly. Install dependencies

```bash
yarn
# or
yarn install
```

And finally, we launch the project.

```bash
yarn develop
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Common password validation

```javascript
`^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$`;
```

Let's break it down:

`^`: start of string anchor\
`(?=.*[a-z])`: positive lookahead for at least one lowercase letter\
`(?=.*[A-Z])`: positive lookahead for at least one uppercase letter\
`(?=.*\d)`: positive lookahead for at least one digit\
`(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-])`: positive lookahead for at least one special symbol\
`.{8,}`: match any character (except newline) at least 8 times\
`$`: end of string anchor\

This regular expression uses positive lookaheads to assert that each of the requirements is present in the string, and then matches any character (except newline) at least 8 times. The special symbols in the positive lookahead can be modified to include other symbols if desired.

## Icons Usage

To add a new icon:

1. Add svg icon to the `assets/images` (in the wrapper 24x24px - as in the design)
2. Name the file as it is named in design, with camelCase (minus-circle-alt => minusCircleAlt)
3. Change fill to `“current”` in this file to make it possible reusability of this icon with different colours.

To use icon:

1. Import it as “FileNameSVG” (MinusCircleAltSVG)
2. Determine color by adding classname (`“fill-white”`)
3. Default size is 24x24px. If you need another size (16x16px)- add classnames (`“w-4 h-4”`) and add `viewBox=“0 0 24 24”`
