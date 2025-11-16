import React from "react";
import Filters from "../../components/Filters/Filters";
import ReasonModal from "../../components/ReasonModal/ReasonModal";
import AdsList from "../../components/AdsList/AdsList";
import BulkPanel from "../../components/BulkPanel/BulkPanel";
import SavedFiltersPanel from "../../components/SavedFiltersPanel/SavedFiltersPanel";
import { useListAdsFilters } from "../../hooks/useListAdsFilters";
import { useListAdsData } from "../../hooks/useListAdsData";
import { useListAdsBulk } from "../../hooks/useListAdsBulk";
import { useFiltersStorage } from "../../hooks/useFiltersStorage";
import { QUICK_REASONS } from "../../utils/listAdsConstants";
import styles from "./ListAds.module.css";

const ListAds: React.FC = () => {
  const { filters, setters, resetFilters } = useListAdsFilters();
  const { ads, newAds, loading, totalPages, totalItems, categories, showNewAds, loadAds } =
    useListAdsData(filters);
  const {
    selectedAds,
    bulkAction,
    reason,
    comment,
    toggleSelectAd,
    selectAllAds,
    deselectAllAds,
    setBulkAction,
    setReason,
    setComment,
    handleBulkApprove,
    handleBulkActionSubmit,
    clearBulkAction,
  } = useListAdsBulk(loadAds);
  const { savedFilters, copyURL, saveFilter, applySavedFilter } = useFiltersStorage();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Список объявлений</h1>

      {newAds.length > 0 && (
        <div className={styles.newAdsButton}>
          <button onClick={showNewAds}>{newAds.length} новых объявлений Показать</button>
        </div>
      )}

      <SavedFiltersPanel
        savedFilters={savedFilters}
        onCopyURL={copyURL}
        onSaveFilter={saveFilter}
        onApplySavedFilter={applySavedFilter}
      />

      <Filters
        search={filters.search}
        setSearch={setters.setSearch}
        statusFilter={filters.statusFilter}
        setStatusFilter={setters.setStatusFilter}
        categories={categories}
        categoryFilter={filters.categoryFilter}
        setCategoryFilter={setters.setCategoryFilter}
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        setMinPrice={setters.setMinPrice}
        setMaxPrice={setters.setMaxPrice}
        sortBy={filters.sortBy}
        setSortBy={setters.setSortBy}
        sortOrder={filters.sortOrder}
        setSortOrder={setters.setSortOrder}
        onReset={resetFilters}
      />

      <BulkPanel
        selectedCount={selectedAds.size}
        onSelectAll={() => selectAllAds(ads.map((ad) => ad.id))}
        onDeselectAll={deselectAllAds}
        onApprove={handleBulkApprove}
        onReject={() => setBulkAction("reject")}
        onRequestChanges={() => setBulkAction("requestChanges")}
      />

      <AdsList ads={ads} loading={loading} selectedAds={selectedAds} onSelectAd={toggleSelectAd} />

      <div className={styles.pagination}>
        <button disabled={filters.page <= 1} onClick={() => setters.setPage(filters.page - 1)}>
          Назад
        </button>
        <span>
          {filters.page} / {totalPages}
        </span>
        <button
          disabled={filters.page >= totalPages}
          onClick={() => setters.setPage(filters.page + 1)}
        >
          Вперед
        </button>
      </div>
      <div className={styles.total}>Всего объявлений: {totalItems}</div>

      {bulkAction && (
        <ReasonModal
          title={bulkAction === "reject" ? "Отклонить объявления" : "Вернуть на доработку"}
          reason={reason}
          setReason={setReason}
          comment={comment}
          setComment={setComment}
          reasons={QUICK_REASONS}
          onCancel={clearBulkAction}
          onSubmit={handleBulkActionSubmit}
        />
      )}
    </div>
  );
};

export default ListAds;
