import axios from "axios";

export default {
    newIncome: function (incomeData) {
        return axios.post("api/Month", incomeData);
    },
    updateIncome: function (incomeData) {
        return axios.update("api/income", incomeData);
    }
    // saveBook: function (bookData) {
    //     console.log(bookData);
    //     return axios.post("/api/books", bookData);
    // },
    // savedBooks: function () {
    //     return axios.get("/api/books");
    // },
    // deleteBook: function (id) {
    //     return axios.delete("api/books/" + id)
    // }

};