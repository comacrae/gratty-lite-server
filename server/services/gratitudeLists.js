import * as helper from "./service-helpers.js";

async function getPagedGratitudeLists(page = 1) {
  const results = await helper.getPagedResults("*", page, "posts");
  return results;
}

async function getPostIdsByAuthor(authorId) {
  const results = await helper.getUnpagedResults(
    "post_id, created_at",
    "posts",
    `WHERE author_id = ${authorId}`
  );
  return results;
}

async function getPostIdsAndTextByAuthor(authorId) {
  const results = await helper.getUnpagedResults(
    "SELECT *",
    "posts_with_text",
    `WHERE posts_with_text.author_id = ${authorId}`
  );
  return results;
}

async function getSpecificListText(postId, authorId) {
  const results = await helpers.getUnpagedResults(
    "item_text",
    "posts_with_text",
    `WHERE post_id = ${postId} AND author_id = ${authorId}`
  );
  return results;
}

async function getPostIdsByMinDate(minDate) {
  const results = await helper.getUnpagedResults(
    "post_id, created_at",
    "posts",
    `WHERE created_at >= ${minDate}`
  );
  return results;
}

export {
  getPagedGratitudeLists,
  getPostIdsAndTextByAuthor,
  getPostIdsByAuthor,
  getSpecificListText,
};
