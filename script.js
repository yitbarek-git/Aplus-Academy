// Aplus Academy - Online Learning Platform for Ethiopian Freshmen

document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplus Academy - Empowering Ethiopian Freshmen');
    
    // ========== FORM VALIDATION AND SUBMISSION ==========
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmit);
    }
    
    // ========== INITIALIZE ALL COMPONENTS ==========
    initializeComponents();
    
    // ========== UTILITY FUNCTIONS ==========
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showSuccessMessage(message) {
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) existingMessage.remove();
        
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #4CAF50, #2E7D32);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: center;
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
                animation: fadeIn 0.5s ease;
            ">
                <span style="font-size: 1.2em;">✓</span> ${message}
                <p style="margin-top: 10px; font-size: 0.9em; opacity: 0.9;">
                    Check your email for confirmation and study materials!
                </p>
            </div>
        `;
        
        registrationForm.parentNode.insertBefore(successDiv, registrationForm.nextSibling);
    }
    
    function hideSuccessMessage() {
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => successMessage.remove(), 500);
        }
    }
    
    function showErrorMessages(messages) {
        const existingErrors = document.querySelector('.error-messages');
        if (existingErrors) existingErrors.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-messages';
        errorDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #f44336, #c62828);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: left;
                box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
                animation: fadeIn 0.5s ease;
            ">
                <strong style="display: block; margin-bottom: 10px;">
                    Please fix the following errors:
                </strong>
                <ul style="margin: 0; padding-left: 20px;">
                    ${messages.map(msg => `<li>${msg}</li>`).join('')}
                </ul>
            </div>
        `;
        
        registrationForm.parentNode.insertBefore(errorDiv, registrationForm);
    }
    
    function showEthiopianWelcome(name) {
        const welcomeMessages = [
            `ሰላም ${name}! Welcome to Aplus Academy! Your journey to success starts here!`,
            `እንኳን ወደ Aplus Academy በደህና መጡ ${name}! Quality Education for Ethiopian Students!`,
            `ደህና መጡ ${name}! Together we'll achieve academic excellence!`
        ];
        
        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        
        const ethiopianWelcome = document.createElement('div');
        ethiopianWelcome.className = 'ethiopian-welcome';
        ethiopianWelcome.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #FFD700, #FFC107);
                color: #333;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                text-align: center;
                border-left: 5px solid #DA1212;
                border-right: 5px solid #078930;
                animation: pulse 2s infinite;
            ">
                <h3 style="margin: 0 0 10px 0; color: #078930;">
                    <span style="font-size: 1.5em;">🇪🇹</span> Ethiopian Student Welcome
                </h3>
                <p style="margin: 0; font-size: 1.1em; font-weight: bold;">
                    ${randomMessage}
                </p>
                <p style="margin-top: 10px; font-size: 0.9em;">
                    Check our Telegram channel for Amharic tutorials: 
                    <a href="https://t.me/aplusacademy11" style="color: #0088cc; font-weight: bold;">
                        @aplusacademy11
                    </a>
                </p>
            </div>
        `;
        
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.parentNode.insertBefore(ethiopianWelcome, successMessage.nextSibling);
        } else {
            registrationForm.parentNode.insertBefore(ethiopianWelcome, registrationForm.nextSibling);
        }
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const gender = document.querySelector('input[name="gender"]:checked');
        const age = document.getElementById('age').value;
        const country = document.getElementById('country').value;
        
        const validation = validateForm({ name, email, password, gender, age, country });
        
        if (validation.isValid) {
            showSuccessMessage('Registration successful! Welcome to Aplus Academy!');
            
            if (country === 'ethiopia') {
                showEthiopianWelcome(name);
            }
            
            setTimeout(() => {
                registrationForm.reset();
                hideSuccessMessage();
            }, 3000);
            
            console.log(`New registration: ${name}, ${email}, ${country}`);
        } else {
            showErrorMessages(validation.errors);
        }
    }
    
    function validateForm({ name, email, password, gender, age, country }) {
        let isValid = true;
        const errors = [];
        
        if (!name) {
            errors.push('Please enter your full name');
            isValid = false;
        }
        
        if (!email || !isValidEmail(email)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }
        
        if (!password || password.length < 8) {
            errors.push('Password must be at least 8 characters long');
            isValid = false;
        }
        
        if (!gender) {
            errors.push('Please select your gender');
            isValid = false;
        }
        
        if (!age || age < 16 || age > 50) {
            errors.push('Age must be between 16 and 50');
            isValid = false;
        }
        
        if (!country) {
            errors.push('Please select your country');
            isValid = false;
        }
        
        return { isValid, errors };
    }
    
    // ========== COMPONENT INITIALIZATION ==========
    function initializeComponents() {
        createSocialMediaDashboard();
        enhanceVideoPlayers();
        createStudyPlanner();
        loadEthiopianSubjects();
        createExamCountdown();
        createFreshmenQuiz();
        addAnimations();
    }
    
    // ========== SOCIAL MEDIA DASHBOARD ==========
    function createSocialMediaDashboard() {
        const socialMediaSection = document.querySelector('.social-media');
        if (!socialMediaSection) return;
        
        const dashboard = document.createElement('div');
        dashboard.className = 'social-dashboard';
        dashboard.innerHTML = `
            <div style="
                background: white;
                border-radius: 15px;
                padding: 25px;
                margin-top: 30px;
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                border-top: 5px solid #4c6ef5;
            ">
                <h3 style="color: #4c6ef5; margin-top: 0; text-align: center;">
                    📚 Online Learning Resources
                </h3>
                <p style="text-align: center; color: #666; margin-bottom: 25px;">
                    Access our educational content across platforms:
                </p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    ${createPlatformCard('YouTube', '#FF0000', 'Video tutorials for all subjects', 'youtube')}
                    ${createPlatformCard('Telegram', '#0088cc', 'PDFs, Notes & Daily Quizzes', 'telegram')}
                    ${createPlatformCard('TikTok', '#000000', 'Short study tips & tricks', 'tiktok')}
                    ${createPlatformCard('Instagram', 'linear-gradient(45deg, #405de6, #833ab4)', 'Visual study guides & updates', 'instagram')}
                </div>
                
                <div style="margin-top: 25px; padding: 15px; background: #f0f7ff; border-radius: 10px; text-align: center;">
                    <p style="margin: 0; color: #4c6ef5; font-weight: bold;">
                        💡 Tip: Follow us on all platforms for complete learning experience!
                    </p>
                </div>
            </div>
        `;
        
        socialMediaSection.appendChild(dashboard);
        
        document.querySelectorAll('.visit-platform').forEach(button => {
            button.addEventListener('click', function() {
                visitPlatform(this.getAttribute('data-platform'));
            });
            
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    function createPlatformCard(title, bgColor, description, platform) {
        return `
            <div class="platform-card" style="
                background: ${bgColor};
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
            ">
                <h4 style="margin: 0 0 10px 0;">${getPlatformIcon(title)} ${title}</h4>
                <p style="font-size: 0.9em; margin-bottom: 15px;">${description}</p>
                <button class="visit-platform" data-platform="${platform}" style="
                    background: white;
                    color: ${getButtonColor(bgColor)};
                    border: none;
                    padding: 8px 20px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.3s;
                ">${getButtonText(title)}</button>
            </div>
        `;
    }
    
    function getPlatformIcon(title) {
        const icons = {
            'YouTube': '🎥',
            'Telegram': '📢',
            'TikTok': '🎵',
            'Instagram': '📸'
        };
        return icons[title] || '📱';
    }
    
    function getButtonColor(bgColor) {
        if (bgColor.includes('gradient')) return '#833ab4';
        if (bgColor === '#000000') return '#000000';
        return bgColor;
    }
    
    function getButtonText(title) {
        const texts = {
            'YouTube': 'Watch Tutorials',
            'Telegram': 'Join Community',
            'TikTok': 'Quick Lessons',
            'Instagram': 'Follow for Updates'
        };
        return texts[title] || 'Visit';
    }
    
    function visitPlatform(platform) {
        const urls = {
            youtube: 'http://www.youtube.com/@aplusacademy1',
            telegram: 'https://t.me/aplusacademy11',
            tiktok: 'https://www.tiktok.com/@new_tech26',
            instagram: 'https://www.instagram.com/aplusacademy1/'
        };
        
        window.open(urls[platform], '_blank');
        showNotification(getVisitMessage(platform));
    }
    
    function getVisitMessage(platform) {
        const messages = {
            youtube: 'Opening YouTube tutorials...',
            telegram: 'Joining Telegram community...',
            tiktok: 'Opening TikTok short lessons...',
            instagram: 'Opening Instagram page...'
        };
        return messages[platform] || 'Opening platform...';
    }
    
    function showNotification(message) {
        const existingNotification = document.querySelector('.platform-notification');
        if (existingNotification) existingNotification.remove();
        
        const notification = document.createElement('div');
        notification.className = 'platform-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4c6ef5;
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
            ">
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    // ========== VIDEO PLAYER ENHANCEMENTS ==========
    function enhanceVideoPlayers() {
        document.querySelectorAll('video').forEach((video, index) => {
            video.addEventListener('play', () => {
                console.log(`Video ${index + 1} started playing`);
            });
            
            video.addEventListener('ended', () => {
                showVideoCompletion(index + 1);
            });
            
            addQualitySelector(video, index);
        });
    }
    
    function showVideoCompletion(videoNumber) {
        const messages = [
            "Great job! Ready for the next lesson?",
            "በጣም ጥሩ! See the next video.",
            "Excellent! Check our Telegram for more resources."
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const completionDiv = document.createElement('div');
        completionDiv.className = 'video-completion';
        completionDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #4c6ef5, #3653c9);
                color: white;
                padding: 15px;
                border-radius: 10px;
                margin: 15px 0;
                text-align: center;
                animation: fadeIn 0.5s ease;
            ">
                <span style="font-size: 1.2em;">🎉</span> 
                Video ${videoNumber} completed! 
                <span style="display: block; margin-top: 5px; font-size: 0.9em;">
                    ${randomMessage}
                </span>
            </div>
        `;
        
        const videos = document.querySelectorAll('video');
        if (videos[videoNumber - 1]) {
            const videoContainer = videos[videoNumber - 1].closest('.video-container');
            if (videoContainer) {
                videoContainer.appendChild(completionDiv);
                setTimeout(() => completionDiv.remove(), 5000);
            }
        }
    }
    
    function addQualitySelector(video, index) {
        const container = video.parentElement;
        const qualityDiv = document.createElement('div');
        qualityDiv.className = 'quality-selector';
        qualityDiv.style.cssText = `
            margin-top: 10px;
            text-align: center;
            font-size: 0.9em;
            color: #666;
        `;
        
        qualityDiv.innerHTML = `
            <span>Quality: </span>
            <select style="
                padding: 5px;
                border: 1px solid #ddd;
                border-radius: 5px;
                background: white;
                cursor: pointer;
            ">
                <option>360p (Data Saver)</option>
                <option selected>720p (Recommended)</option>
                <option>1080p (HD)</option>
            </select>
        `;
        
        qualityDiv.querySelector('select').addEventListener('change', function() {
            console.log(`Video ${index + 1} quality changed to: ${this.value}`);
        });
        
        container.appendChild(qualityDiv);
    }
    
    // ========== STUDY PLANNER ==========
    function createStudyPlanner() {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;
        
        const planner = document.createElement('div');
        planner.className = 'study-planner';
        planner.innerHTML = `
            <div style="
                background: white;
                border-radius: 15px;
                padding: 25px;
                margin: 40px 0;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                border-left: 5px solid #4c6ef5;
            ">
                <h3 style="color: #4c6ef5; margin-top: 0;">
                    📅 Weekly Study Planner for Ethiopian Freshmen
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0;">
                    ${createStudyDay('Monday', 'Discrete Math & Communicative English')}
                    ${createStudyDay('Tuesday', 'Computer Programming Basics')}
                    ${createStudyDay('Wednesday', 'Logic & Philosophy')}
                    ${createStudyDay('Thursday', 'History/Geography')}
                    ${createStudyDay('Friday', 'Economics, Entrepreneurship')}
                    ${createStudyDay('Saturday & Sunday', 'Review & Practice')}
                </div>
                
                <div style="
                    background: #f0fff0;
                    padding: 15px;
                    border-radius: 10px;
                    margin-top: 20px;
                    border-left: 4px solid #4CAF50;
                ">
                    <p style="margin: 0; color: #2E7D32; font-weight: bold;">
                        💡 Ethiopian students Tip: Follow this weekly plan and join our 
                        <a href="https://t.me/aplusacademy11" style="color: #0088cc;">
                            Telegram group
                        </a> 
                        for daily reminders!
                    </p>
                </div>
                
                <button id="download-schedule" style="
                    background: linear-gradient(135deg, #4c6ef5, #3653c9);
                    color: white;
                    border: none;
                    padding: 12px 25px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 20px;
                    width: 100%;
                    transition: transform 0.3s;
                ">
                    📥 Download Full Study Schedule (PDF)
                </button>
            </div>
        `;
        
        aboutSection.appendChild(planner);
        
        document.getElementById('download-schedule').addEventListener('click', function() {
            this.innerHTML = '📥 Downloading...';
            this.style.background = '#2E7D32';
            
            setTimeout(() => {
                this.innerHTML = '✅ Schedule Downloaded!';
                showNotification('Study schedule downloaded! Check your downloads folder.');
                
                setTimeout(() => {
                    this.innerHTML = '📥 Download Full Study Schedule (PDF)';
                    this.style.background = 'linear-gradient(135deg, #4c6ef5, #3653c9)';
                }, 3000);
            }, 1500);
        });
    }
    
    function createStudyDay(day, subject) {
        return `
            <div class="study-day" style="
                background: #e8f4ff;
                padding: 15px;
                border-radius: 10px;
                text-align: center;
            ">
                <div style="font-weight: bold; color: #4c6ef5;">${day}</div>
                <div style="font-size: 0.9em; margin-top: 5px;">${subject}</div>
            </div>
        `;
    }
    
    // ========== ETHIOPIAN SUBJECTS INFO ==========
    function loadEthiopianSubjects() {
        const subjectsSection = document.querySelector('.subjects-section');
        if (!subjectsSection) return;
        
        const gradingInfo = document.createElement('div');
        gradingInfo.className = 'grading-info';
        gradingInfo.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #FFD700, #FFC107);
                color: #333;
                padding: 20px;
                border-radius: 15px;
                margin: 30px 0;
                text-align: center;
                border: 2px dashed #DA1212;
            ">
                <h3 style="margin: 0 0 15px 0; color: #078930;">
                    🇪🇹 Ethiopian University Grading System
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 20px 0;">
                    ${createGradeBox('A+', '4.0', '90-100%', '#078930')}
                    ${createGradeBox('A', '4.0', '85-90%', '#2E7D32')}
                    ${createGradeBox('A-', '3.96', '80-85%', '#4c6ef5')}
                    ${createGradeBox('B+', '3.92', '75-80%', '#e4e2db')}
                    ${createGradeBox('B', '3.83', '70-75%', '#f44336')}
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 20px 0;">
                    ${createGradeBox('B-', '3.5', '65-70%', '#ff9800')}
                    ${createGradeBox('C+', '3.0', '60-65%', '#ff5722')}
                    ${createGradeBox('C', '2.5', '50-60%', '#e91e63')}
                    ${createGradeBox('C-', '2.25', '45-50%', '#ff4081')}
                    ${createGradeBox('D', '2.0', '45-50%', '#9c27b0')}
                    ${createGradeBox('F', '0.0', '0-45%', '#607d8b')}
                </div>
                
                <p style="margin: 15px 0; font-weight: bold;">
                    Note: Minimum CGPA to graduate is 2.00
                </p>
                
                <button id="calculate-gpa" style="
                    background: #078930;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 25px;
                    font-weight: bold;
                    cursor: pointer;
                    margin-top: 10px;
                ">
                    📊 Calculate Your GPA!
                </button>
            </div>
        `;
        
        subjectsSection.appendChild(gradingInfo);
        document.getElementById('calculate-gpa').addEventListener('click', openGPACalculator);
    }
    
    function createGradeBox(grade, points, range, color) {
        return `
            <div style="background: ${color}; color: white; padding: 10px; border-radius: 8px;">
                <div style="font-size: 1.2em; font-weight: bold;">${grade}</div>
                <div style="font-size: 0.9em;">${points} (${range})</div>
            </div>
        `;
    }
    
    function openGPACalculator() {
        const calculatorHTML = `
            <div id="gpa-calculator-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            ">
                <div style="
                    background: white;
                    padding: 30px;
                    border-radius: 15px;
                    max-width: 500px;
                    width: 90%;
                    max-height: 90vh;
                    overflow-y: auto;
                ">
                    <h3 style="color: #4c6ef5; margin-top: 0; text-align: center;">
                        🇪🇹 Ethiopian University GPA Calculator
                    </h3>
                    
                    <div id="gpa-courses">
                        ${createCourseRow()}
                    </div>
                    
                    <button id="add-course" style="
                        background: #4c6ef5;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin: 10px 0;
                        width: 100%;
                    ">
                        ➕ Add Another Course
                    </button>
                    
                    <button id="calculate-gpa-btn" style="
                        background: #078930;
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin: 10px 0;
                        width: 100%;
                        font-weight: bold;
                    ">
                        📊 Calculate GPA
                    </button>
                    
                    <div id="gpa-result" style="
                        margin-top: 20px;
                        padding: 15px;
                        background: #f0f7ff;
                        border-radius: 10px;
                        text-align: center;
                        display: none;
                    "></div>
                    
                    <button id="close-calculator" style="
                        background: #f44336;
                        color: white;
                        border: none;
                        padding: 10px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-top: 15px;
                        width: 100%;
                    ">
                        Close Calculator
                    </button>
                </div>
            </div>
        `;
        
        const existingCalculator = document.getElementById('gpa-calculator-modal');
        if (existingCalculator) existingCalculator.remove();
        
        document.body.insertAdjacentHTML('beforeend', calculatorHTML);
        
        document.getElementById('add-course').addEventListener('click', addCourseRow);
        document.getElementById('calculate-gpa-btn').addEventListener('click', calculateGPA);
        document.getElementById('close-calculator').addEventListener('click', () => {
            document.getElementById('gpa-calculator-modal').remove();
        });
    }
    
    function createCourseRow() {
        return `
            <div class="course-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                <input type="text" placeholder="Course Name" class="course-name" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <input type="number" placeholder="Credit" class="course-credit" min="1" max="5" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <select class="course-grade" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <option value="4">A+ (4.0)</option>
                    <option value="3.5">A (4.0)</option>
                    <option value="3">A- (3.96)</option>
                    <option value="2.5">B+ (3.92)</option>
                    <option value="2">B (3.83)</option>
                    <option value="1.5">B- (3.5)</option>
                    <option value="1">D (2.0)</option>
                    <option value="0">F (0.0)</option>
                </select>
            </div>
        `;
    }
    
    function addCourseRow() {
        const coursesDiv = document.getElementById('gpa-courses');
        const newRow = document.createElement('div');
        newRow.className = 'course-row';
        newRow.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; margin-bottom: 15px;';
        newRow.innerHTML = createCourseRow();
        coursesDiv.appendChild(newRow);
    }
    
    function calculateGPA() {
        const courseRows = document.querySelectorAll('.course-row');
        let totalPoints = 0;
        let totalCredits = 0;
        
        courseRows.forEach(row => {
            const credit = parseFloat(row.querySelector('.course-credit').value) || 0;
            const grade = parseFloat(row.querySelector('.course-grade').value) || 0;
            
            if (credit > 0) {
                totalPoints += credit * grade;
                totalCredits += credit;
            }
        });
        
        const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
        
        const resultDiv = document.getElementById('gpa-result');
        resultDiv.style.display = 'block';
        
        let message = '';
        let color = '';
        
        if (gpa >= 3.5) {
            message = 'Excellent! First Class! 🎉';
            color = '#078930';
        } else if (gpa >= 3.0) {
            message = 'Very Good! Keep it up! 👍';
            color = '#4c6ef5';
        } else if (gpa >= 2.5) {
            message = 'Good! You are on track! 💪';
            color = '#FFC107';
        } else {
            message = 'Needs improvement. Use our resources! 📚';
            color = '#f44336';
        }
        
        resultDiv.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: ${color};">Your GPA: ${gpa}</h4>
            <p style="margin: 0 0 10px 0; font-weight: bold;">${message}</p>
            <p style="margin: 0; font-size: 0.9em;">
                Total Credits: ${totalCredits} | Total Points: ${totalPoints.toFixed(2)}
            </p>
            ${gpa < 2.0 ? '<p style="margin-top: 10px; color: #f44336; font-weight: bold;">ትኩረት ይስጡ: You need minimum 2.00 CGPA to graduate!</p>' : ''}
        `;
        
        resultDiv.style.background = gpa >= 2.0 ? '#f0fff0' : '#fff0f0';
    }
    
    // ========== EXAM COUNTDOWN TIMER ==========
    function createExamCountdown() {
        const resourcesSection = document.querySelector('.resources-section');
        if (!resourcesSection) return;
        
        const examDate = new Date();
        examDate.setMonth(examDate.getMonth() + 2);
        
        const countdownDiv = document.createElement('div');
        countdownDiv.className = 'exam-countdown';
        countdownDiv.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #ff6b6b, #ee5a52);
                color: white;
                padding: 25px;
                border-radius: 15px;
                margin: 30px 0;
                text-align: center;
            ">
                <h3 style="margin: 0 0 15px 0;">⏳ Final Exams Countdown</h3>
                
                <div id="countdown-timer" style="
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    margin: 20px 0;
                ">
                    ${createCountdownUnit('days', 'Days')}
                    ${createCountdownUnit('hours', 'Hours')}
                    ${createCountdownUnit('minutes', 'Minutes')}
                    ${createCountdownUnit('seconds', 'Seconds')}
                </div>
                
                <p style="margin: 15px 0; font-size: 1.1em;">
                    Time remaining until final exams
                </p>
                
                <div style="
                    background: rgba(255, 255, 255, 0.2);
                    padding: 15px;
                    border-radius: 10px;
                    margin-top: 20px;
                ">
                    <p style="margin: 0; font-weight: bold;">
                        📚 Study Tip: Complete at least 4 chapters per week to be ready!
                    </p>
                </div>
            </div>
        `;
        
        resourcesSection.parentNode.insertBefore(countdownDiv, resourcesSection.nextSibling);
        
        updateCountdown(examDate);
        setInterval(() => updateCountdown(examDate), 1000);
    }
    
    function createCountdownUnit(id, label) {
        return `
            <div class="countdown-unit" style="
                background: rgba(255, 255, 255, 0.2);
                padding: 15px;
                border-radius: 10px;
            ">
                <div id="${id}" style="font-size: 2em; font-weight: bold;">00</div>
                <div style="font-size: 0.9em;">${label}</div>
            </div>
        `;
    }
    
    function updateCountdown(examDate) {
        const now = new Date().getTime();
        const timeRemaining = examDate - now;
        
        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => {
                const element = document.getElementById(id);
                if (element) {
                    const value = [days, hours, minutes, seconds][index];
                    element.textContent = value.toString().padStart(2, '0');
                }
            });
        }
    }
    
    // ========== INTERACTIVE QUIZ ==========
    function createFreshmenQuiz() {
        const ctaSection = document.querySelector('.cta-section');
        if (!ctaSection) return;
        
        const quizDiv = document.createElement('div');
        quizDiv.className = 'freshmen-quiz';
        quizDiv.innerHTML = `
            <div style="
                background: white;
                border-radius: 15px;
                padding: 25px;
                margin: 40px 0;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                border-top: 5px solid #4c6ef5;
            ">
                <h3 style="color: #4c6ef5; margin-top: 0; text-align: center;">
                    🧠 General Quiz: Ethiopian Higher Education Edition
                </h3>
                
                <div id="quiz-container" style="margin: 25px 0;">
                    <div id="quiz-question" style="
                        background: #f0f7ff;
                        padding: 20px;
                        border-radius: 10px;
                        margin-bottom: 20px;
                        font-weight: bold;
                        font-size: 1.1em;
                    ">
                        Which Ethiopian university is well known in its technology departments?
                    </div>
                    
                    <div id="quiz-options" style="display: grid; gap: 10px;">
                        ${createQuizOption('Addis Ababa University', false)}
                        ${createQuizOption('Bahir Dar University', true)}
                        ${createQuizOption('Gondar University', false
