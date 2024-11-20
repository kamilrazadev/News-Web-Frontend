import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryFilter from "./components/CategoryFilter";
import ArticleCard from "./components/ArticleCard";
import DateFilter from "./components/DateFilter";
import Pagination from "./components/Pagination";
import { getNews } from "./services/newsApi";
import { Article, Category } from "./types";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { GrTechnology } from "react-icons/gr";
import { FaBusinessTime } from "react-icons/fa";
import { MdHealthAndSafety, MdOutlineSportsBasketball } from "react-icons/md";
import { IoMdMusicalNotes } from "react-icons/io";
import { GiMaterialsScience } from "react-icons/gi";
import SourceFilter from "./components/SourceFilter";
import ArticleCardHorizontal from "./components/ArticleCardHorizontal";

const ITEMS_PER_PAGE = 12;

const categories: Category[] = [
  { id: "technology", icon: GrTechnology, name: "Technology" },
  { id: "business", icon: FaBusinessTime, name: "Business" },
  { id: "sports", icon: MdOutlineSportsBasketball, name: "Sports" },
  { id: "entertainment", icon: IoMdMusicalNotes, name: "Entertainment" },
  { id: "science", icon: GiMaterialsScience, name: "Science" },
  { id: "health", icon: MdHealthAndSafety, name: "Health" },
];

function App() {
  const [articles, setArticles] = useState<Article[]>([]); // Paginated articles
  const [loading, setLoading] = useState(true); // Pagination loading
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [source, setSource] = useState("News API");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [latestArticles, setLatestArticles] = useState<Article[]>([]); // Latest news
  const [latestLoading, setLatestLoading] = useState(true); // Loading state for latest news

  const [startDate, endDate] = dateRange;

  // Fetch latest 6 articles (only once when component mounts)
  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setLatestLoading(true);
        const data = await getNews(
          searchQuery,
          selectedCategory,
          undefined,
          undefined,
          1
        );
        setLatestArticles(data.articles.slice(0, 6)); // Take only the first 6 articles
      } catch (error) {
        toast.error("Failed to fetch latest articles");
      } finally {
        setLatestLoading(false);
      }
    };

    fetchLatestArticles();
  }, []); // Empty dependency array ensures this runs only once

  // Fetch paginated articles based on filters
  const fetchNews = async (page: number = 1) => {
    setLoading(true);
    try {
      const formattedStartDate = startDate
        ? format(startDate, "yyyy-MM-dd")
        : undefined;
      const formattedEndDate = endDate
        ? format(endDate, "yyyy-MM-dd")
        : undefined;

      const data = await getNews(
        searchQuery,
        selectedCategory,
        formattedStartDate,
        formattedEndDate,
        page
      );
      setArticles(data.articles);
      setTotalResults(data.totalResults);
      setCurrentPage(data.currentPage);
    } catch (error) {
      toast.error("Failed to fetch news articles");
    } finally {
      setLoading(false);
    }
  };

  // Trigger news fetch when filters or search query change
  useEffect(() => {
    setCurrentPage(1); // Reset to the first page when filters change
    fetchNews(1); // Fetch the news for the first page
  }, [selectedCategory, startDate, endDate, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchNews(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Header
        onSearch={handleSearch}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar isOpen={isSidebarOpen} />

      <main className="transition-all duration-300 ease-in-out lg:ml-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-xl font-bold mb-2 text-slate-600">
            Top Categories
          </h2>
          {/*Filters Section  */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <div className="flex md:flex-nowrap flex-wrap gap-4 items-center justify-center">
              <SourceFilter source={source} onSourceChange={setSource} />
              <DateFilter
                startDate={startDate}
                endDate={endDate}
                onDateChange={setDateRange}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-6">
            {/* Main News Section */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-4 text-slate-600">
                All News
              </h2>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 max-w-full">
                    {articles.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  )}
                </>
              )}
            </div>
            {/* Latest News Section */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-xl font-bold mb-4 text-slate-600">
                Latest News
              </h2>
              {latestLoading ? (
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 h-20 rounded-lg mb-4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {latestArticles.map((article) => (
                    <ArticleCardHorizontal key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
