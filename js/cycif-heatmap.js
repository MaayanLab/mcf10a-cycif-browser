
function drawCircos(error, drugs, annotations, cytosolicFC, nuclearFC) {
  var width = 800;//document.getElementsByClassName('mdl-card__supporting-text')[0].offsetWidth
  var circosHeatmap = new Circos({
        container: '#heatmapChart',
        width: width,
        height: width
    });

    cytosolicFC = cytosolicFC.map(function(d) {
      return {
        block_id: d.drug_name,
        start: parseInt(d.start),
        end: parseInt(d.end),
        value: parseFloat(d.logfc)
      };
    })
    nuclearFC = nuclearFC.map(function(d) {
      return {
        block_id: d.drug_name,
        start: parseInt(d.start),
        end: parseInt(d.end),
        value: parseFloat(d.logfc)
      };
    })
    circosHeatmap
      .layout(
        drugs,
        {
          innerRadius: width / 2 - 180,
          outerRadius: width / 2 - 150,
          ticks: {display: false},
          labels: {
            position: 'center',
            display: true,
            size: 14,
            color: '#000',
            radialOffset: 10
          }
        }
      )
      .heatmap('cytosolicFC', cytosolicFC, {
        innerRadius: 0.8,
        outerRadius: 0.99,
        logScale: false,
        color: 'RdBu'
      })
      .heatmap('nuclearFC', nuclearFC, {
        innerRadius: 0.7,
        outerRadius: 0.79,
        logScale: false,
        color: 'RdBu'
      })
      .render()
}

d3.queue()
  .defer(d3.json, './data/drugs.json')
  .defer(d3.csv, './data/differential_expression/Actin-differential_expression_cytosolic.txt')
  .defer(d3.csv, './data/differential_expression/Actin-differential_expression_cytosolic.txt')
  .defer(d3.csv, './data/differential_expression/Actin-differential_expression_nuclear.txt')
  // .defer(d3.csv, './data/days-off.csv')
  .await(drawCircos)
