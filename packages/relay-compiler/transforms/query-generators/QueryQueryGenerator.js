/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

'use strict';

const {
  buildFragmentSpread,
  buildOperationArgumentDefinitions,
} = require('./utils');

import type {Fragment} from '../../core/GraphQLIR';
import type {Schema} from '../../core/Schema';
import type {QueryGenerator, RefetchRoot} from '.';

function buildRefetchOperation(
  schema: Schema,
  fragment: Fragment,
  queryName: string,
): ?RefetchRoot {
  const queryType = schema.expectQueryType();
  if (!schema.areEqualTypes(fragment.type, queryType)) {
    return null;
  }

  return {
    path: [],
    node: {
      argumentDefinitions: buildOperationArgumentDefinitions(
        fragment.argumentDefinitions,
      ),
      directives: [],
      kind: 'Root',
      loc: {kind: 'Derived', source: fragment.loc},
      metadata: null,
      name: queryName,
      operation: 'query',
      selections: [buildFragmentSpread(fragment)],
      type: queryType,
    },
    transformedFragment: fragment,
  };
}

module.exports = ({
  description: 'the query type',
  buildRefetchOperation,
}: QueryGenerator);
