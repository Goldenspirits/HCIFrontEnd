<template>

  <a-layout class="mainContainer" id="container">
    <a-layout class="container" id="mount" style="background-color: transparent;">
      <a-spin :spinning="g6Spinning">
      </a-spin>
      <h3 style="position: absolute;right: 2em;bottom: .5em;">个人画像</h3>
    </a-layout>
  </a-layout>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import * as kg from '../utils/kg';
  import G6 from '@antv/g6';

  export default {
    name: "knowledgeGraph",
    data() {
      return {
        width: 0,
        height: 0,
        locationCache: {},
        data: {},
        graph: '',
        svgArea: null,
        g6Spinning: false,
      }
    },
    mounted() {
      this.g6Spinning = true;
      console.log("进行了初始化");
      this.initGraph();
    },
    computed: {
      ...mapGetters([
        'portrait',
        'userId'
      ]),
    },
    methods: {
      ...mapActions([
        'getUserPortrait',
        'getUserInfo',
      ]),
      async initGraph() {
        if (this.portrait.nodes === null) {
          // if (this.userId === -1) await this.getUserInfo();
          await this.getUserPortrait(this.userId)
        }
        const mount = document.getElementById('mount');

        this.data = this.portrait;

        let nodeMap = new Map();
        this.clusterMap = new Map();
        let clusterId = 0;
        this.data.nodes.forEach((node) => {
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

        this.width = document.body.clientWidth / 3 * 2 - 5;
        this.height = document.body.clientHeight / 2 - 10;

        const graph = new G6.Graph({
          container: mount,
          center: true,
          width: this.width,
          height: this.height,
          linkCenter: true,
          enabledStack: true,
          modes: {
            default: [
              'drag-canvas',
              'drag-node',
            ],
          },
          layout: {
            type: "force",
            nodeSpacing: 25,
            linkDistance: 150,
            preventOverlap: true,
            edgeStrength: 0,
            nodeStrength: 0
          },
          animate: true,
          defaultNode: {
            type: 'circle',
            size: 50,
            labelCfg: {
              style: {
                fontSize: 10
              }
            }
          },
          defaultEdge: {
            type: 'quadratic',
            labelCfg: {
              autoRotate: true,
              style: {
                fontWeight: 350,
                fontSize: 14
              }
            },
            style: {
              stroke: '#999',
              lineAppendWidth: 10,
              lineDash: null,
              endArrow: {
                path: G6.Arrow.triangle(10, 10, 25),
                d: 30,
                fill: '#999',
                opacity: 0.2,
              },
            },
          },
          nodeStateStyles: {
            active: {
              opacity: 1,
            },
            inactive: {
              opacity: 0.4,
            },
          },
          edgeStateStyles: {
            active: {
              opacity: 1,
            },
          },
        });
        this.graph = graph;
        graph.data(this.data);
        graph.render();

        graph.on('node:dragstart', function (e) {
          if (!e.item.hasLocked()) {
            graph.layout();
            refreshDragedNodePosition(e);
          }
        });
        graph.on('node:drag', function (e) {
          // forceLayout.execute();
          if (!e.item.hasLocked()) {
            refreshDragedNodePosition(e);
          }
        });
        graph.on('node:dragend', function (e) {
          if (!e.item.hasLocked()) {
            e.item.get('model').fx = null;
            e.item.get('model').fy = null;
          }
        });

        if (typeof window !== 'undefined')
          window.onresize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!mount || !mount.scrollWidth || !mount.scrollHeight) return;
            graph.changeSize(mount.scrollWidth, mount.scrollHeight);
          };

        function refreshDragedNodePosition(e) {
          const model = e.item.get('model');
          model.fx = e.x;
          model.fy = e.y;
        }

        // 加载结束
        this.g6Spinning = false;
      },
    }

  }
</script>

<style>
  .mainContainer {
    background-color: rgba(245, 248, 252, 0.9);
    user-select: none;
    text-align: center;
    height: 50.7vh;
    margin-left: .5vw;
    width: 65vw;
  }

  .container {
    width: 100vw;
    background-color: transparent;
  }

</style>
