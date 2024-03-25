import * as helper from "./service-helpers.js";

async function getPagedGratitudeLists(page = 1) {
  const results = await helper.getPagedResults("*", page, "posts");
  return results;
}

async function getPostIdsByAuthor(authorId) {
  const results = await helper.getUnpagedResults(
    "id, created_at",
    "posts",
    `WHERE author_id = ${authorId}`
  );
  return results;
}

async function getPostIdsAndTextByAuthor(authorId) {
  const results = await helper.getUnpagedResults(
    "*",
    "posts_with_text",
    `WHERE posts_with_text.author_id = ${authorId}`
  );
  return results;
}

async function getListTextByAuthorAndPost(postId, authorId) {
  const results = await helper.getUnpagedResults(
    "item_text",
    "posts_with_text",
    `WHERE post_id = ${postId} AND author_id = ${authorId}`,
    "ORDER BY item_id ASC"
  );
  return results;
}

async function getPostsByAuthorSince(minDate, authorId) {
  const results = await helper.getUnpagedResults(
    "id, created_at",
    "posts",
    `WHERE created_at >= ${minDate} AND author_id = ${authorId}`,
    "ORDER BY created_at DESC"
  );
  return results;
}

export {
  getPagedGratitudeLists,
  getPostIdsAndTextByAuthor,
  getPostIdsByAuthor,
  getListTextByAuthorAndPost,
  getPostsByAuthorSince,
};
