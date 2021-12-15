<template>
  <div id="mountK"></div>
</template>

<script>
  import G6 from '@antv/g6';
  import * as kg from '../utils/kg';

  export default {
    name: "kgInQuestion",
    props: {
      graphData: Object
    },
    data() {
      return {g6Spinning: false}
    },
    mounted() {
      this.initG6();
    },
    methods: {
      initG6() {
        const mount = document.getElementById('mountK');
        // 将int格式的id, source, target转为string
        this.graphData.nodes.forEach((node) => {
          node.id = node.id.toString();
        });
        this.graphData.edges.forEach((edge) => {
          edge.source = edge.source.toString();
          edge.target = edge.target.toString();
        });

        let nodeMap = new Map();
        this.clusterMap = new Map();
        let clusterId = 0;
        this.graphData.nodes.forEach((node) => {
          nodeMap.set(node.id, node);
          // cluster 分配颜色
          if (node.cluster && this.clusterMap.get(node.cluster) === undefined) {
            this.clusterMap.set(node.cluster, clusterId);
            clusterId++;
          }
          const cid = this.clusterMap.get(node.cluster);
          if (!node.style) node.style = {};
          node.style.fill = kg.colors[cid % kg.colors.length];
          node.style.stroke = kg.strokes[cid % kg.strokes.length];
        });


        // 初始化G6图谱
        const graph = new G6.Graph({
          container: mount,
          center: true,
          // canvas的长宽
          width: mount.offsetWidth,
          height: mount.offsetHeight,
          // plugins: [tooltip],
          // 设置可以拖动节点、放缩图谱等
          modes: {default: ['drag-canvas', 'drag-node']},
          layout: {
            type: "force",
            nodeSpacing: 15,
            linkDistance: 130,
            preventOverlap: true,
          },
          defaultNode: {
            type: 'circle',
            size: 45,
            labelCfg: {
              style: {
                fontSize: 10
              }
            }
          },
          defaultEdge: {
            labelCfg: {
              autoRotate: true,
              style: {
                fontWeight: 200,
                fontSize: 10
              }
            }
          }
        });


        // 读取数据、渲染图谱
        graph.data(this.graphData);
        graph.render();

        // 拖动节点的动画效果
        graph.on('node:dragstart', function (e) {
          graph.layout();
          refreshDragedNodePosition(e);
        });
        graph.on('node:drag', function (e) {
          refreshDragedNodePosition(e);
        });
        graph.on('node:dragend', function (e) {
          e.item.get('model').fx = null;
          e.item.get('model').fy = null;
        });

        function refreshDragedNodePosition(e) {
          const model = e.item.get('model');
          model.fx = e.x;
          model.fy = e.y;
        }
      },
    }
  }
</script>

<style scoped>
  #mountK {
    border-radius: 20px;
    background-color: transparent;
    width: 48vw;
    height: 80vh;
  }
</style>
