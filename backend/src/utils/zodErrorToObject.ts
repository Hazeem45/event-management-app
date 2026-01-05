type TreeNode = {
  errors?: string[];
  properties?: Record<string, TreeNode>;
};

export function extractZodErrors(
  node: TreeNode,
  prefix = ""
): Record<string, string> {
  let result: Record<string, string> = {};

  if (node.errors && node.errors.length > 0) {
    if (prefix) {
      result[prefix] = node.errors[0];
    } else {
      result["error"] = node.errors[0];
    }
  }

  if (node.properties) {
    for (const key in node.properties) {
      const child = node.properties[key];
      const path = prefix ? `${prefix}.${key}` : key;

      Object.assign(result, extractZodErrors(child, path));
    }
  } else {
  }

  return result;
}
