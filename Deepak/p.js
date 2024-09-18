let taskCompletionChart, attendanceChart, efficiencyChart;

        function updateCharts(taskCompletion, attendance, efficiency) {
            // Update Task Completion Rate Chart
            taskCompletionChart.data.datasets[0].data = taskCompletion;
            taskCompletionChart.update();

            // Update Attendance Rate Chart
            attendanceChart.data.datasets[0].data = attendance;
            attendanceChart.update();

            // Update Efficiency Score Chart
            efficiencyChart.data.datasets[0].data = efficiency;
            efficiencyChart.update();
        }

        document.getElementById('calculateBtn').addEventListener('click', function() {
            const quality = parseFloat(document.getElementById('quality').value);
            const teamwork = parseFloat(document.getElementById('teamwork').value);
            const adaptability = parseFloat(document.getElementById('adaptability').value);
            const timeManagement = parseFloat(document.getElementById('timeManagement').value);

            // Calculate the total score
            const totalScore = quality + teamwork + adaptability + timeManagement;
            const averageScore = totalScore / 4; // Calculate the average

            // Display the performance score and average score
            document.getElementById('performanceScore').innerText = totalScore;
            document.getElementById('averageScore').innerText = averageScore.toFixed(2);

            // Update the charts based on the form input
            const taskCompletion = [quality * 10, teamwork * 10, adaptability * 10]; // Example transformation
            const attendance = [quality * 10, teamwork * 5, adaptability * 3]; // Example transformation
            const efficiency = [quality * 5, teamwork * 5, adaptability * 5, timeManagement * 5]; // Example

            updateCharts(taskCompletion, attendance, efficiency);
        });

        // Task Completion Rate Chart
        const taskCompletionCtx = document.getElementById('taskCompletionChart').getContext('2d');
        taskCompletionChart = new Chart(taskCompletionCtx, {
            type: 'bar',
            data: {
                labels: ['Worker A', 'Worker B', 'Worker C'],
                datasets: [{
                    label: 'Task Completion Rate (%)',
                    data: [85, 75, 90],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Attendance Rate Chart
        const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
        attendanceChart = new Chart(attendanceCtx, {
            type: 'pie',
            data: {
                labels: ['Present', 'Absent', 'Late'],
                datasets: [{
                    label: 'Attendance Rate (%)',
                    data: [80, 10, 10],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // Efficiency Score Chart
        const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
        efficiencyChart = new Chart(efficiencyCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Efficiency Score (%)',
                    data: [70, 80, 85, 90],
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });