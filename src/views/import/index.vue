<template>
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from "@/api/employees";
export default {
  data() {
    return {
      type: this.$route.query.type,
    };
  },
  methods: {
    async success({ header, results }) {
      if (this.type === "user") {
        const userRelations = {
          入职日期: "timeOfEntry",
          手机号: "mobile",
          姓名: "username",
          转正日期: "correctionTime",
          工号: "workNumber",
        };
        const arr = [];
        results.forEach((item) => {
          const userInfo = {};
          Object.keys(item).forEach((key) => {
            if (
              userRelations[key] === "timeOfEntry" ||
              userRelations[key] === "correctionTime"
            ) {
              userInfo[userRelations[key]] = new Date(
                this.formDate(item[key], "/")
              );
              return;
            }
            userInfo[userRelations[key]] = item[key];
          });
          arr.push(userInfo);
          console.log(arr, "arr");
        });
        await importEmployee(arr);
        this.$router.back();
      }
    },
    //转化excel的日期格式
    formDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1);
      time.setYear(time.getFullYear() - 70);
      const year = time.getFullYear() + "";
      const month = time.getMonth() + 1 + "";
      const date = time.getDate() + "";
      if (format && format.length === 1) {
        return year + format + month + format + date;
      }
      return (
        year +
        (month < 10 ? "0" + month : month) +
        (date < 10 ? "0" + date : date)
      );
    },
  },
};
</script>

<style scoped>
</style>