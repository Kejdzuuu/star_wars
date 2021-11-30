import express from "express";
import * as openingCrawlController from "../controllers/openingCrawlController";

const openingCrawlRouter = express.Router();

openingCrawlRouter.get("/word_count", openingCrawlController.unique_words_get);

openingCrawlRouter.get(
  "/most_popular",
  openingCrawlController.most_popular_character
);

openingCrawlRouter.get("/trie", openingCrawlController.trie_nodes_count);

export default openingCrawlRouter;
