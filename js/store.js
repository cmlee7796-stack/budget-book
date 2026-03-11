/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
export const store = {
  currentFunds: 0,

  isFirstEdit: true,
  todayId: 1,

  dateList: [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
    },
  ],
  detailList: {},
};

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}

export function initStore() {
  const storage = sessionStorage.getItem("store");
  if (!storage) {
    updateStorage();
    return;
  }

  const parsed = JSON.parse(storage);
  store.currentFunds = parsed.currentFunds ?? 0;
  store.isFirstEdit = parsed.isFirstEdit ?? true;
  store.dateList = parsed.dateList ?? [];
  store.detailList = parsed.detailList ?? {};
  store.todayId = parsed.todayId ?? 1;
}

export function addNewHistory(newHistory) {
  try {
    if(store.detailList[store.todayId]){
      store.detailList[store.todayId].push(newHistory);
    }else{
      store.detailList[store.todayId] = [newHistory];
    }
  
    store.currentFunds -= newHistory.amount;

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    // TODO:
    /**
     * - store의 detailList 새로 갱신
     * - store.currentFunds 새로 갱신
     */
    console.log(itemId);
    console.log(store.detailList[dateId]);
    if (store.detailList[dateId]) {
      store.detailList[dateId] = store.detailList[dateId].filter(item => item.id !== itemId);
    }

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
