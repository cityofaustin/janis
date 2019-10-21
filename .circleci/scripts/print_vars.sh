#!/usr/bin/env bash
set -e

function print_var {
  echo "$1: [${!1}]"
}

echo "########"
echo "Here's what's stored in CircleCI:"
echo "########"
print_var "CI_COA_PUBLISHER_URL"
