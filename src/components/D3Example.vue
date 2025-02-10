<template>
  <div ref="chart"></div>
</template>

<script setup lang="ts">
import * as d3 from "d3";
import { onMounted, ref, onBeforeUnmount } from "vue";
const chart = ref<HTMLDivElement | null>(null);

//ResizeObserver 是一個由現代瀏覽器提供的原生 API，
// 用來監聽一個或多個 DOM 元素尺寸（寬度、高度或內容區域）的變化。
let resizeObserver: ResizeObserver;
onMounted(() => {
  drawChart();
  if (chart.value) {
    resizeObserver = new ResizeObserver(() => {
      console.log("螢幕尺寸發生變化會觸發");
      drawChart();
    });
    resizeObserver.observe(chart.value);
  }
  console.log(resizeObserver);
});

onBeforeUnmount(() => {
  if (chart.value && resizeObserver) {
    resizeObserver.disconnect();
  }
});

function drawChart() {
  if (!chart.value) return;
  d3.select(chart.value).selectAll("*").remove();

  const data = ref([
    { name: "Jeff", score: 100 },
    { name: "Tim", score: 65 },
    { name: "Hani", score: 88 },
    { name: "Louis", score: 72 },
    { name: "Howard", score: 52 },
  ]);
  // 設定邊距，讓軸有足夠空間顯示
  const margin = { top: 20, right: 20, bottom: 50, left: 50 };

  //當 chart.value.clientWidth 大於或等於 600 時，containerWidth 就被設定為 600。
  const containerWidth =
    chart.value.clientWidth >= 600 ? 600 : chart.value.clientWidth;

  const [width, height] = [
    containerWidth - margin.left - margin.right,
    400 - margin.top - margin.bottom,
  ];
  // 建立 SVG 並將 g 元素平移 (margin convention)
  const svg = d3
    .select(chart.value)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  //建立x軸比例尺
  const x = d3
    .scaleBand()
    .domain(data.value.map((item) => item.name))
    .range([0, width])
    .padding(0.25);

  // 建立 y 軸的比例尺，使用 scaleLinear 對應連續數值
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data.value, (d) => d.score) as number])
    .nice()
    .range([height, 0]);

  // 綁定資料並繪製長條
  svg
    .selectAll(".bar")
    .data(data.value)
    //.enter()： 取得資料中尚未對應到 DOM 的部分，並用來創建新的元素。
    .enter()
    .append("rect")
    .attr("class", "bar")
    //.attr("x", ...)： 設定每個 bar 的水平位置（根據資料的名稱）。
    .attr("x", (d) => x(d.name) as number)
    //.attr("y", ...)： 設定每個 bar 的垂直位置（根據資料的分數）
    .attr("y", (d) => y(d.score))
    //.當使用 d3.scaleBand() 時，該比例尺會根據你設定的範圍和 padding 自動計算每一個「區段」的寬度，
    // 這個寬度就是 x.bandwidth()。
    .attr("width", x.bandwidth())
    //.attr("height", ...)： 計算並設定每個 bar 的高度（圖表總高度減去 bar 的 y 軸位置）。
    .attr("height", (d) => height - y(d.score))
    .attr("fill", "gray");

  // 繪製 x 軸
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  //繪製y軸
  svg.append("g").call(d3.axisLeft(y));
}
</script>
