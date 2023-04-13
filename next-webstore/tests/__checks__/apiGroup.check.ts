import { CheckGroup, ApiCheck, AssertionBuilder } from "@checkly/cli/constructs";

/*
 * In this example, we bundle checks using a Check Group. We add checks to this group in two ways:
 * 1. By passing the `CheckGroup` object for the `group` property of the check.
 * 2. By defining a glob pattern that matches browser checks using *.spec.js.
 *
 * You can use either or both.
 */

// We can define multiple checks in a single *.check.js file.
const group = new CheckGroup("basic-api-check-group", {
  name: "API checks",
  activated: true,
  muted: false,
  runtimeId: "2022.10",
  locations: ["us-east-1", "eu-west-1"],
  tags: ["default", "APIs"],
  environmentVariables: [],
  apiCheckDefaults: {},
  concurrency: 100,
  alertChannels: [  ],
  browserChecks: {
    testMatch: "some-dir/*.spec.ts",
  },
});

new ApiCheck("check-group-api-check-1", {
  name: "Books - returning",
  group,
  degradedResponseTime: 10000,
  maxResponseTime: 20000,
  request: {
    method: "GET",
    url: "https://api.checklyhq.com/public-stats",
    followRedirects: true,
    assertions: [
      AssertionBuilder.statusCode().equals(200),
      AssertionBuilder.jsonBody("$.apiCheckResults").greaterThan(0),
    ],
  },
});
