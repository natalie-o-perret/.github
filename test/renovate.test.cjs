const assert = require("node:assert/strict");
const test = require("node:test");
const config = require("../renovate-config.json");

const manager = config.customManagers[0];
const [versionPattern, checksumPattern] = manager.matchStrings.map(
  (pattern) => new RegExp(pattern),
);

test("extracts the compiler release from GLEAM_VERSION", () => {
  assert.deepEqual({ ...versionPattern.exec("v1.2.3\n").groups }, {
    currentValue: "v1.2.3",
  });
  assert.equal(versionPattern.test("v1.2.3\nunexpected content\n"), false);
});

test("extracts the release and checksum together", () => {
  const digest = "a".repeat(64);
  const source = `# renovate: gleam-version=v1.2.3\nchecksum="${digest}"\n`;
  assert.deepEqual({ ...checksumPattern.exec(source).groups }, {
    currentValue: "v1.2.3",
    currentDigest: digest,
  });
  assert.equal(checksumPattern.test(source.replace(digest, "invalid")), false);
});
