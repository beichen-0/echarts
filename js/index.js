$(function () {
  // 1 实现rem适配
  // onresize：当屏幕的大小发生变化的时候，就会自动的触发
  // 在事件中，我们应该重新获取当前浏览器的宽度，重新的计算出当前的宽度下1rem到底等于多少px
  window.onresize = function () {
    // 获取当前浏览器的宽度
    let width = this.document.documentElement.clientWidth
    console.log(width)
    if (width > 1920) {
      width = 1920
    } else if (width < 1024) {
      width = 1024
    }
    // 80是自己约定的分数，
    let fontSize = width / 80 + 'px'
    // 2. 将这个字体大小设置给网页的根元素html
    this.document.documentElement.style.fontSize = fontSize
  };

  // 监控区域
  // 1. 单击标签项能够切换样式，切换内容面板
  // 2 添加动画
  (function () {
    // 委托方式绑定事件
    $('.monitor').on('click', '.tabs a', function () {
      // 使用排他法设置active样式，为当前被单击的元素添加active样式，同时去除它的兄弟元素的active的样式
      // addClass：jq的方法，可以为元素添加样式
      // removeClss: 可以为元素移除样式
      // siblings：查找所有兄弟元素
      $(this).addClass('active').siblings().removeClass('active')
      // 点击切换内容面板：
      // 思路：根据当前被点击的a标签的自定义属性值来对应指定索引的content
      // siblings('.content):这里参数content不能少，因为content有其它的兄弟元素
      // console.log($(this).data('index'))
      // 在jq中，获取自定义属性可通过$(jqobj).data(自定义属性名称) | $(jqobj).data.自定义属性名称
      $('.monitor .content').eq($(this).data('index')).show().siblings('.content').hide()
    })
    // 实现无限循环的动画效果，关键在于将需要执行动画的元素复制一份，追加到最后
    // 注意，这里有两个内容面板，它们都需要进行这个处理
    $('.monitor .list ul').each(function () {
      // li标签是对象，如果不复制，相当于移动，所以要复制之后再追加到最后
      $(this).append($(this).children().clone())
    })
  })();

  // 3. 点位站点统计分布
  (function () {
    // 1. 基于准备好的dom，初始化echarts实例，需要指定图表的放置区域
    let mychart = echarts.init(document.querySelector('.sites .pie'))
    // 2 准备图表的数据-配置
    let option = {
      tooltip: {
        // 触发，鼠标移动到什么上面，显示提示，item说明移动到图形上触发
        trigger: 'item',
        // a：图表的名称
        // b: 单击数据中的name
        // c: 当前数据value
        // d：当前数据在所有数据中的所占据的比例
        formatter: '{a}<br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'left',
        top: 'top',
        // 这个值只能是series中的name的值
        data: ['我们一家人'],
        textStyle: {
          color: 'red'
        }
      },
      series: [
        {
          name: '我们一家人', // 图表名称
          type: 'pie', // 图表类型
          radius: ['15%', '60%'], // 饼图大小
          center: ['50%', '50%'], // 饼图上的中心点的位置
          roseType: 'area',
          data: [
            {
              value: 10,
              name: '山东'
            },
            {
              value: 5,
              name: '广东'
            },
            {
              value: 15,
              name: '广西'
            },
            {
              value: 25,
              name: '山西'
            },
            {
              value: 20,
              name: '湖南'
            },
            {
              value: 35,
              name: '湖北'
            },
            {
              value: 30,
              name: '云南'
            },
            {
              value: 40,
              name: '北京'
            }
          ],
          color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff']
        }
      ]
    };

    // 3. 使用刚指定的配置项和数据显示图表--渲染
    mychart.setOption(option)
  })();

  // 4. 全国用户总量统计
  (function () {
    // 定义三个item对象
    let item = {
      value: 1200,
      itemStyle: {
        color: '#254065'
      },
      // 不能设置单个元素是否头tooltip，所以当前需要进行单个item的处理的时候，我们只能进行其他的操作，如设置透明度等
      tooltip: {
        // 悬浮层透明度为0
        extraCssText: 'opacity:0'
      },
      emphasis: {
        itemStyle: {
          color: '#254065'
        }
      }
    }

    // 1初始化
    let mychart = echarts.init(document.querySelector('.users .bar'))
    // 2 添加配置项
    let option = {
      color: ['#f00'],
      tooltip: {
        // 设置提示的触发时机
        trigger: 'item',
        axisPointer: {        // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'      // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      // 通过定位的四个方向的设置，可以控制元素的大小
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '5%',
        // 图表的大小范围是否包含标签内容
        containLabel: true,
        // 必须设置为true才能看到边框
        show: true,
        // 设置图表的边框颜色
        borderColor: 'rgba(0, 240, 255, .3)'
      },
      xAxis: [
        {
          type: 'category',
          data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
          // 坐标轴刻度相关设置
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            color: '#4c9bfd'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          // 设置垂直方向上的轴的样式
          splitLine: {
            lineStyle: {
              color: '#4c9bfd'
            }
          },
          axisLabel: {
            color: '#4c9bfd'
          },
          axisLine: {
            lineStyle: {
              color: '#4c9bfd'
            }
          }
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
          itemStyle: {
            color: 'yellow'
          },
          // 设置item的颜色--统一设置颜色
          color: {
            // 说明是线性渐变
            type: 'linear',
            // 所谓的0和1，其实代表的是方向
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            // 渐变色的起始和终点
            colorStops: [{
              offset: 0,
              color: '#00fffb'
            }, {
              offset: 1,
              color: '#0061ce'
            }]
          }
        }
      ]
    };

    // 3. 渲染
    mychart.setOption(option)
  })();

  // 5. 订单销量
  (function () {
    // 定义数据
    var data = {
      day365: {
        orders: '20,301,987',
        amount: '99834'
      },
      day90: {
        orders: '301,987',
        amount: '9834'
      },
      day30: {
        orders: '1,987',
        amount: '3834'
      },
      day1: {
        orders: '987',
        amount: '834'
      }
    }

    // 定时切换
    let index = 0
    $('.order').on('click', '.tabs a', function () {
      // 重置index全局变量
      index = $(this).index()
      // 切换样式
      $(this).addClass('active').siblings().removeClass('active')
      // 获取数据
      // 1. 获取当前被点击的元素
      let type = $(this).data('type')
      // 2. 获取数据
      let currentData = data[type]
      // 赋值
      $('.order_orders').html(currentData.orders)
      $('.order_count').html(currentData.amount)
    })

    // 获取到所有a标签
    let allA = $('.order .tabs a')
    let timeId = setInterval(() => {
      index++
      if (index >= 4) {
        // 循环切换
        index = 0
      }
      // 所谓自动切换，本质还是让a标签响应单击操作，可以让a标签来自动的触发click事件
      // trigger是jq的方法，下面的代码相当于使用trigger来模拟用户的单击操作
      // $(allA[index]).trigger('click')
      // click(); 触发当前元素所绑定的click事件
      // $(allA[index]).click()

      // trigger和click是jq的方法，click在原生js也有定义了
      // allA: 是jq对象，它是一个伪数组，allA[index]获取到了的是dom元素
      // allA[index].trigger('click)
      // $(allA[index]).trigger('click')
      allA.eq(index).trigger('click')
    }, 2000);
  })();

  // 6 销售统计
  (function () {
    var data = {
      year: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      ],
      quarter: [
        [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
        [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
      ],
      month: [
        [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
        [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
      ],
      week: [
        [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
        [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
      ]
    }
    // 1. 基于准备好dom，初始化echarts实例，需要指定图表的放置区域
    let mychart = echarts.init(document.querySelector('.sales .line'))

    let option = {
      legend: {
        // 只能写在series中数据对象的name值
        data: ['预期销售额', '实际销售额'],
        // 设置颜色
        textStyle: {
          color: 'orange'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        // 为了能够正常的显示图例legend,设置离顶部的距离更多
        top: '23%',
        // 图表的大小范围是否包含标签内容
        containLabel: true,
        // 必须设置为true才能看到边框
        show: true,
        // 设置图表的边框颜色
        borderColor: 'rgba(0, 240, 255, 0.3)'
      },
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel: {
          color: 'skyblue'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: 'skyblue'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(0, 240, 255, .3)'
          }
        }
      },
      series: [{
        name: '预期销售额',
        data: data.year[0],
        type: 'line',
        // 平滑的曲线
        smooth: true,
        lineStyle: {
          color: 'yellow'
        }
      },
      {
        name: '实际销售额',
        data: data.year[1],
        type: 'line',
        smooth: true,
        lineStyle: {
          color: 'red'
        }
      }
      ]
    }

    // 3渲染
    mychart.setOption(option)

    // 点击切换
    $('.sales').on('click', '.tabs a', function() {
      // 切换样式
      $(this).addClass('active').siblings().removeClass('active')
      // 获取当前点击的元素
      let type = $(this).data('type')
      // 根据type获取数据
      // 两个获取对象属性的方式
      // 对象.属性：如果属性是一个字符串值
      // 对象[属性]：如果属性是一个变量
      let currentData = data[type]
      // 赋值给图表
      option.series[0].data = currentData[0]
      option.series[1].data = currentData[1]
      // 刷新--重新渲染，你得根据修改之后的option重新的渲染图表
      mychart.setOption(option)
    })

    // 自动切换
    let index = 0;
    let allA = $('.sales .tabs a')
    let timerId = setInterval(() => {
      index++
      if(index >= 4) {
        index = 0
      }
      // 让当前的a标签触发click事件
      $(allA[index]).trigger('click')
    }, 2000);

    // 鼠标移入停止定时器，移开继续
    // 鼠标上移：mouseover  mouseenter
    // 鼠标移开：mouseleave mouseout
    // 事件添加给图表
    $('.sales .line').on('mouseenter', function() {
      console.log(1241244)
      clearInterval(timerId)
    }).on('mouseleave', function() {
      timerId = setInterval(() => {
        index++
        if (index >= 4) {
          index = 0
        }
        // 让当前的a标签触发click事件
        $(allA[index]).trigger('click')
      }, 2000);
    })
  })();

  // 7 销售进度
  (function() {
    // 1. 基于准备好的dom，初始化echarts实例，需要指定图表的放置区域
    let mychart = echarts.init(document.querySelector('.jindu .circle'))
    // 2. 添加配置
    let option = {
      series: [
        {
          name: '',
          type: 'pie',
          // 设置大小
          radius: ['120%', '140%'],
          // 设置位置
          center: ['50%', '90%'],
          avoidLabelOverlap: false,
          // 设置起始高度
          startAngle: 180,
          // 取消高亮偏移
          hoverOffset: 0,
          labelLine: {
            noraml: {
              show: false
            }
          },
          data: [
            {
              value: 100,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'red'
                  }, {
                    offset: 1,
                    color: 'blue'
                  }],
                  global: false
                }
              }
            },
            {
              value: 100,
              itemStyle: {
                color: '#444'
              }
            },
            {
              value: 200,
              itemStyle: {
                color: 'transparent'
              }
            }
          ]
        }
      ]
    }

    // 3 选然
    mychart.setOption(option)
  })();
})
