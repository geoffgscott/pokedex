# Application

```
pnpm install
```

To start dev server:

```
pnpm dev
```

To run the worlds smallest unit test suite:

```
pnpm test:unit
```

# TODO

Uncommit .env file in favour of .env.example. Committing .env for tester convenience.

Add aria attributes to SearchInput component (aria-haspopup etc.)

Handle dynamic upper limit for pokemon list fetch. If the list grew significantly consider server-side search

Migrate CSS module to a per-component level

Add tab buttons beside main data display to allow further data introspection. Expand pokemonDataSlice factory methods to
provision this.

Migrate from species keyed by Id to keyed by name which might increase long-term API stability

Increase test coverage significantly.

Further validate mobile responsiveness. Only a cursory effort was made to handle small screen sizes.

Add image loading state for sprites
