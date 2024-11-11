// Vanilla JS Chart Implementation
const dzChartlist = (function() {
     
    
    const screenWidth = window.innerWidth;
    
    const activityBar = function() {
        const activity = document.getElementById("activityLine");
        const inputs = {
            min: 20,
            max: 80,
            count: 8,
            decimals: 2,
            continuity: 1
        };
        
        if (activity) {
            const activityData = [
                {
                    first: [50, 75, 34, 55, 25, 70, 30, 80, 30, 90, 25, 65]
                },
                {
                    first: [50, 35, 10, 45, 40, 50, 60, 35, 10, 70, 34, 35]
                },
                {
                    first: [20, 35, 70, 45, 40, 35, 30, 35, 10, 40, 60, 20]
                }
            ];
            
            activity.height = 350;
            
            const config = {
                type: "line",
                data: {
                    labels: [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ],
                    datasets: [{
                        label: "My First dataset",
                        data: [50, 75, 34, 55, 25, 70, 30, 80, 30, 90, 25, 65],
                        borderColor: '#2130b8',
                        borderWidth: "5",
                        barThickness: 'flex',
                        backgroundColor: 'rgba(47, 76, 221, 0.05)',
                        minBarLength: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            gridColor: "navy",
                            gridLines: {
                                color: "rgba(0,0,0,0.1)",
                                height: 50,
                                drawBorder: true
                            },
                            ticks: {
                                fontColor: "#585858",
                                max: 100,
                                min: 0,
                                stepSize: 20
                            },
                        }],
                        xAxes: [{
                            barPercentage: 0.3,
                            gridLines: {
                                display: false,
                                zeroLineColor: "transparent"
                            },
                            ticks: {
                                stepSize: 20,
                                fontColor: "#585858",
                                fontFamily: "Nunito, sans-serif"
                            }
                        }]
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false,
                        titleFontColor: "#888",
                        bodyFontColor: "#555",
                        titleFontSize: 12,
                        bodyFontSize: 15,
                        backgroundColor: "rgba(255,255,255,1)",
                        displayColors: true,
                        xPadding: 10,
                        yPadding: 7,
                        borderColor: "rgba(220, 220, 220, 1)",
                        borderWidth: 1,
                        caretSize: 6,
                        caretPadding: 10
                    }
                }
            };

            const ctx = activity.getContext("2d");
            const myLine = new Chart(ctx, config);

            // Convert jQuery tab click handlers to vanilla JS
            const items = document.querySelectorAll("#user-activity .nav-tabs .nav-item");
            items.forEach((item, index) => {
                item.addEventListener("click", () => {
                    config.data.datasets[0].data = activityData[index].first;
                    myLine.update();
                });
            });
        }
    };
    
    const donutChart = function() {
        const options = {
            series: [25, 35, 45],
            colors: ['#ff7a00', '#2130b8', '#21b830'],
            chart: {
                width: 220,
                height: 220,
                type: 'donut',
                sparkline: {
                    enabled: true,
                }
            },
            plotOptions: {
                pie: {
                    customScale: 1,
                    donut: {
                        size: '40%'
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            responsive: [{
                breakpoint: 1300,
                options: {
                    chart: {
                        width: 120,
                        height: 120
                    },
                }
            }],
            legend: {
                show: false
            }
        };
        
        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    };
    
    const ticketSoldChart = function() {
        const ticketSoldElement = document.getElementById("ticketSold");
        
        if (ticketSoldElement) {
            const ctx = ticketSoldElement.getContext('2d');
            
            const barChartData = {
                defaultFontFamily: 'Poppins',
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Expense',
                    backgroundColor: '#2130b8',
                    hoverBackgroundColor: '#142193',
                    data: ['20', '14', '18', '25', '27', '22', '12', '24', '20', '14', '18', '16']
                }, {
                    label: 'Earning',
                    backgroundColor: '#f0f0f0',
                    hoverBackgroundColor: '#e6e6e6',
                    data: ['12', '18', '14', '7', '5', '10', '20', '8', '12', '18', '14', '16']
                }]
            };

            new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            display: true,
                            stacked: true,
                            barPercentage: 0.25,
                            barThickness: 15,
                            ticks: {
                                display: true
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false
                            }
                        }],
                        yAxes: [{
                            display: true,
                            stacked: true,
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            ticks: {
                                display: false
                            }
                        }]
                    }
                }
            });
        }
    };

    const scheduleEvent = function() {
        if (screenWidth < 1400) {
            // Converted to vanilla JS event handling if needed
            // const scheduleEventBtn = document.querySelector('.schedule-event');
            // const eventSidebar = document.querySelector('.event-sidebar');
            // if (scheduleEventBtn && eventSidebar) {
            //     scheduleEventBtn.addEventListener('click', () => {
            //         eventSidebar.classList.toggle('active');
            //     });
            // }
        }
    };

    return {
        init: function() {},
        load: function() {
            activityBar();
            donutChart();
            ticketSoldChart();
            scheduleEvent();
        },
        resize: function() {}
    };
})();

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    // Any initialization code that was in jQuery ready
});

// Window Load Event
window.addEventListener('load', () => {
    setTimeout(() => {
        dzChartlist.load();
    }, 1000);
});

// Window Resize Event
window.addEventListener('resize', () => {
    // Resize handling code
});