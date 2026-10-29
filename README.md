# Shared GitHub configuration

Default community files, reusable workflows, and Renovate configuration.

## Renovate

Enable the Renovate app for each target repository, then add `renovate.json`:

```json
{
  "extends": ["local>natalie-o-perret/.github:renovate-config"]
}
```

The shared preset uses Renovate's recommended defaults and enables Gleam lockfile
maintenance. It groups Gleam compiler updates into one PR, including
`erlef/setup-beam` version inputs, `GLEAM_VERSION`, and pinned browser archives.
It doesn't enable automatic merging.

`GLEAM_VERSION` contains a release tag such as `v1.19.2`. To manage a browser
archive checksum in `bin/build`, keep this annotation directly above the checksum:

```sh
# renovate: gleam-version=v1.19.2
checksum="9d5ac30e0d00ef9627b3adcd9f75abb55ec54c718a1d09c4c60649edaf1462b9"
```

Renovate uses the tag and existing checksum to identify the release asset, then
updates both together. Version pins and checksums stay in the target repository.

### Validate the preset

With Node.js 24:

```sh
node --test test/renovate.test.cjs
npx --yes --package=renovate@44.198.0 renovate-config-validator \
  --no-global --strict renovate-config.json
```
