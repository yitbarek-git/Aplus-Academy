// Aplus Academy - JavaScript for Online Learning Platform
// For Ethiopian Freshmen University Students

document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplus Academy - Empowering Ethiopian Freshmen');
    
    // ========== FORM VALIDATION AND SUBMISSION ==========
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const age = document.getElementById('age').value;
            const country = document.getElementById('country').value;
            
            // Validation
            let isValid = true;
            let errorMessages = [];
            
            if (!name) {
                errorMessages.push('Please enter your full name');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                errorMessages.push('Please enter a valid email address');
                isValid = false;
            }
            
            if (!password || password.length < 8) {
                errorMessages.push('Password must be at least 8 characters long');
                isValid = false;
            }
            
            if (!gender) {
                errorMessages.push('Please select your gender');
                isValid = false;
            }
            
            if (!age || age < 16 || age > 50) {
                errorMessages.push('Age must be between 16 and 50');
                isValid = false;
            }
            
            if (!country) {
                errorMessages.push('Please select your country');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                showSuccessMessage('Registration successful! Welcome to Aplus Academy!');
                
                // Show Ethiopian welcome message based on country
                if (country === 'ethiopia') {
                    showEthiopianWelcome(name);
                }
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    registrationForm.reset();
                    hideSuccessMessage();
                }, 3000);
                
                // Log the registration (in a real app, this would send to a server)
                console.log(`New registration: ${name}, ${email}, ${country}`);
                
            } else {
                showErrorMessages(errorMessages);
            }
        });
    }
    
    // ========== SOCIAL MEDIA INTEGRATION ==========
    // Create social media dashboard
    createSocialMediaDashboard();
    
    // ========== VIDEO PLAYER ENHANCEMENTS ==========
    enhanceVideoPlayers();
    
    // ========== STUDY PLANNER FOR FRESHMEN ==========
    createStudyPlanner();
    
    // ========== ETHIOPIAN UNIVERSITY SUBJECTS INFO ==========
    loadEthiopianSubjects();
    
    // ========== EXAM COUNTDOWN TIMER ==========
    createExamCountdown();
    
    // ========== INTERACTIVE QUIZ FOR FRESHMEN ==========
    createFreshmenQuiz();
    
    // ========== ANIMATIONS AND EFFECTS ==========
    addAnimations();
    
    // ========== UTILITY FUNCTIONS ==========
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function showSuccessMessage(message) {
        // Remove any existing success messages
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) existingMessage.remove();
        
        // Create success message
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
        
        // Insert after the form
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
        // Remove any existing error messages
        const existingErrors = document.querySelector('.error-messages');
        if (existingErrors) existingErrors.remove();
        
        // Create error container
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
        
        // Insert before the form
        registrationForm.parentNode.insertBefore(errorDiv, registrationForm);
    }
    
    function showEthiopianWelcome(name) {
        const welcomeMessages = [
            `ሰላም ${name}! Welcome to Aplus Academy! Your journey to success starts here!`,
            `እንኳን ወደ Aplus Academy በደህና መጡ ${name}! Quality Education for Ethiopian Students!`,
            `ደህና መጡ ${name}! Together we'll achieve academic excellence!`
        ];
        
        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        
        // Create Ethiopian welcome message
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
        
        // Insert after success message or form
        const successMessage = document.querySelector('.success-message');
        if (successMessage) {
            successMessage.parentNode.insertBefore(ethiopianWelcome, successMessage.nextSibling);
        } else {
            registrationForm.parentNode.insertBefore(ethiopianWelcome, registrationForm.nextSibling);
        }
    }
    
    // ========== SOCIAL MEDIA DASHBOARD ==========
    function createSocialMediaDashboard() {
        const socialMediaSection = document.querySelector('.social-media');
        if (!socialMediaSection) return;
        
        // Create dashboard
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
                    <div class="platform-card" style="
                        background: #FF0000;
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <h4 style="margin: 0 0 10px 0;">🎥 YouTube</h4>
                        <p style="font-size: 0.9em; margin-bottom: 15px;">
                            Video tutorials for all subjects
                        </p>
                        <button class="visit-platform" data-platform="youtube" style="
                            background: white;
                            color: #FF0000;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                            transition: transform 0.3s;
                        ">
                            Watch Tutorials
                        </button>
                    </div>
                    
                    <div class="platform-card" style="
                        background: #0088cc;
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <h4 style="margin: 0 0 10px 0;">📢 Telegram</h4>
                        <p style="font-size: 0.9em; margin-bottom: 15px;">
                            PDFs, Notes & Daily Quizzes
                        </p>
                        <button class="visit-platform" data-platform="telegram" style="
                            background: white;
                            color: #0088cc;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                            transition: transform 0.3s;
                        ">
                            Join Community
                        </button>
                    </div>
                    
                    <div class="platform-card" style="
                        background: #000000;
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <h4 style="margin: 0 0 10px 0;">🎵 TikTok</h4>
                        <p style="font-size: 0.9em; margin-bottom: 15px;">
                            Short study tips & tricks
                        </p>
                        <button class="visit-platform" data-platform="tiktok" style="
                            background: white;
                            color: #000000;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                            transition: transform 0.3s;
                        ">
                            Quick Lessons
                        </button>
                    </div>
                    
                    <div class="platform-card" style="
                        background: linear-gradient(45deg, #405de6, #833ab4);
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <h4 style="margin: 0 0 10px 0;">📸 Instagram</h4>
                        <p style="font-size: 0.9em; margin-bottom: 15px;">
                            Visual study guides & updates
                        </p>
                        <button class="visit-platform" data-platform="instagram" style="
                            background: white;
                            color: #833ab4;
                            border: none;
                            padding: 8px 20px;
                            border-radius: 25px;
                            font-weight: bold;
                            cursor: pointer;
                            transition: transform 0.3s;
                        ">
                            Follow for Updates
                        </button>
                    </div>
                </div> 
                
                <div style="margin-top: 25px; padding: 15px; background: #f0f7ff; border-radius: 10px; text-align: center;">
                    <p style="margin: 0; color: #4c6ef5; font-weight: bold;">
                        💡 Tip: Follow us on all platforms for complete learning experience!
                    </p>
                </div>
            </div>
        `;
        
        socialMediaSection.appendChild(dashboard);
        
        // Add event listeners to platform buttons
        document.querySelectorAll('.visit-platform').forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                visitPlatform(platform);
            });
            
            // Add hover effects
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    function visitPlatform(platform) {
        const urls = {
            youtube: 'http://www.youtube.com/@aplusacademy1',
            telegram: 'https://t.me/aplusacademy11',
            tiktok: 'https://www.tiktok.com/@new_tech26',
            instagram: 'https://www.instagram.com/aplusacademy1/'
        };
        
        // Open in new tab
        window.open(urls[platform], '_blank');
        
        // Show confirmation message
        const messages = {
            youtube: 'Opening YouTube tutorials...',
            telegram: 'Joining Telegram community...',
            tiktok: 'Opening TikTok short lessons...',
            instagram: 'Opening Instagram page...'
        };
        
        showNotification(messages[platform]);
    }
    
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.platform-notification');
        if (existingNotification) existingNotification.remove();
        
        // Create notification
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
        
        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }
    
    // ========== VIDEO PLAYER ENHANCEMENTS ==========
    function enhanceVideoPlayers() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach((video, index) => {
            // Add play/pause tracking
            video.addEventListener('play', function() {
                console.log(`Video ${index + 1} started playing`);
                // You could track this for analytics
            });
            
            video.addEventListener('ended', function() {
                showVideoCompletion(index + 1);
            });
            
            // Add quality selector (simulated)
            addQualitySelector(video, index);
        });
    }
    
    function showVideoCompletion(videoNumber) {
        const messages = [
            "Great job! Ready for the next lesson?",
            "በጣም ጥሩ! see the next video.!",
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
        
        // Find the video container and append message
        const videos = document.querySelectorAll('video');
        if (videos[videoNumber - 1]) {
            const videoContainer = videos[videoNumber - 1].closest('.video-container');
            if (videoContainer) {
                videoContainer.appendChild(completionDiv);
                
                // Remove after 5 seconds
                setTimeout(() => {
                    if (completionDiv.parentNode) {
                        completionDiv.style.animation = 'fadeOut 0.5s ease';
                        setTimeout(() => completionDiv.remove(), 500);
                    }
                }, 5000);
            }
        }
    }
    
    function addQualitySelector(video, index) {
        // This is a simulated quality selector
        // In a real app, you'd have different video sources
    
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
        
        const select = qualityDiv.querySelector('select');
        select.addEventListener('change', function() {
            console.log(`Video ${index + 1} quality changed to: ${this.value}`);
            // In real implementation, you would change the video source
        });
        
        container.appendChild(qualityDiv);
    }
    
    // ========== STUDY PLANNER FOR FRESHMEN ==========
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
                    <div class="study-day" style="
                        background: #e8f4ff;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <div style="font-weight: bold; color: #4c6ef5;">Monday</div>
                        <div style="font-size: 0.9em; margin-top: 5px;">Discrete Math & communicative English</div>
                    </div>
                    
                    <div class="study-day" style="
                        background: #e8f4ff;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <div style="font-weight: bold; color: #4c6ef5;">Tuesday</div>
                        <div style="font-size: 0.9em; margin-top: 5px;">computer Programming basics</div>
                    </div>
                    
                    <div class="study-day" style="
                        background: #e8f4ff;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <div style="font-weight: bold; color: #4c6ef5;">Wednesday</div>
                        <div style="font-size: 0.9em; margin-top: 5px;">Logic & Philosophy</div>
                    </div>
                    
                    <div class="study-day" style="
                        background: #e8f4ff;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <div style="font-weight: bold; color: #4c6ef5;">Thursday</div>
                        <div style="font-size: 0.9em; margin-top: 5px;">History/Geography</div>
                    </div>
                    
                    <div class="study-day" style="
                        background: #e8f4ff;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <div style="font-weight: bold; color: #4c6ef5;">Friday</div>
                        <div style="font-size: 0.9em; margin-top: 5px;">Economics, entrepreneurship</div>
                    </div>

                    <div class="study-day" style="
                        background: #e8f4ff;
                        padding: 15px;
                        border-radius: 10px;
                        text-align: center;
                    ">
                        <div style="font-weight: bold; color: #4c6ef5;">Saturday and sunday</div>
                        <div style="font-size: 0.9em; margin-top: 5px;">Review & Practice</div>
                    </div>
                </div>
                <br>
                
                
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
        
        // Add download schedule functionality
        document.getElementById('download-schedule').addEventListener('click', function() {
            this.innerHTML = '📥 Downloading...';
            this.style.background = '#2E7D32';
            
            setTimeout(() => {
                this.innerHTML = '✅ Schedule Downloaded!';
                showNotification('Study schedule downloaded! Check your downloads folder.');
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    this.innerHTML = '📥 Download Full Study Schedule (PDF)';
                    this.style.background = 'linear-gradient(135deg, #4c6ef5, #3653c9)';
                }, 3000);
            }, 1500);
        });
    }
    
    // ========== ETHIOPIAN UNIVERSITY SUBJECTS INFO ==========
    function loadEthiopianSubjects() {
        const subjectsSection = document.querySelector('.subjects-section');
        if (!subjectsSection) return;
        
        // Ethiopian university grading info
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
                    <div style="background: #078930; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">A+</div>
                        <div style="font-size: 0.9em;">4.0 (90-100%)</div>
                    </div>

                    <div style="background: #2E7D32; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">A</div>
                        <div style="font-size: 0.9em;">4.0 (85-90%)</div>
                    </div>
                  <div style="background: #4c6ef5; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">A-</div>
                        <div style="font-size: 0.9em;">3.96 (80-85%)</div>
                    </div>
                    
                    <div style="background: #e4e2dbff; color: #333; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">B+</div>
                        <div style="font-size: 0.9em;">3.92 (75-80%)</div>
                    </div>
                    <div style="background: #f44336; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">B</div>
                        <div style="font-size: 0.9em;">3.83 (70-75%)</div>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 20px 0;">
                    <div style="background: #ff9800; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">B-</div>
                        <div style="font-size: 0.9em;">3.5 (65-70%)</div>
                    </div>
                 <div style="background: #ff5722; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">C+</div>
                        <div style="font-size: 0.9em;">3.0 (60-65%)</div>
                    </div>
                    <div style="background: #e91e63; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">C</div>
                        <div style="font-size: 0.9em;">2.5 (50-60%)</div>
                    </div>
                    <div style="background: #ff4081; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">C-</div>
                        <div style="font-size: 0.9em;">2.25 (45-50%)</div>
                    </div>
                    <div style="background: #9c27b0; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">D</div>
                        <div style="font-size: 0.9em;">2.0 (45-50%)</div>
                    </div>
                    <div style="background: #607d8b; color: white; padding: 10px; border-radius: 8px;">
                        <div style="font-size: 1.2em; font-weight: bold;">F</div>
                        <div style="font-size: 0.9em;">0.0 (0-45%)</div>
                    </div>
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
        
        // GPA Calculator functionality
        document.getElementById('calculate-gpa').addEventListener('click', function() {
            openGPACalculator();
        });
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
                        <!-- Courses will be added here -->
                        <div class="course-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; margin-bottom: 15px;">
                            <input type="text" placeholder="Course Name (e.g., Mathematics)" class="course-name" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            <input type="number" placeholder="Credit" class="course-credit" min="1" max="5" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                            <select class="course-grade" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                                <option value="4">A+ (4.0)</option>
                                <option value="3.5">A (4.0)</option>
                                <option value="3">A-(3.96)</option>
                                <option value="2.5">B+ (3.92)</option>
                                <option value="2">B (3.83)</option>
                                <option value="1.5">B- (3.5)</option>
                                <option value="1">D (2.0)</option>
                                <option value="0">F (0.0)</option>
                            </select>
                        </div>
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
                    ">
                        <!-- Result will be shown here -->
                    </div>
                    
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
        
        // Remove existing calculator if any
        const existingCalculator = document.getElementById('gpa-calculator-modal');
        if (existingCalculator) existingCalculator.remove();
        
        // Add calculator to page
        document.body.insertAdjacentHTML('beforeend', calculatorHTML);
        
        // Add event listeners
        document.getElementById('add-course').addEventListener('click', addCourseRow);
        document.getElementById('calculate-gpa-btn').addEventListener('click', calculateGPA);
        document.getElementById('close-calculator').addEventListener('click', function() {
            document.getElementById('gpa-calculator-modal').remove();
        });
    }
    
    function addCourseRow() {
        const coursesDiv = document.getElementById('gpa-courses');
        const newRow = document.createElement('div');
        newRow.className = 'course-row';
        newRow.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 10px; margin-bottom: 15px;';
        newRow.innerHTML = `
            <input type="text" placeholder="Course Name" class="course-name" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            <input type="number" placeholder="Credit" class="course-credit" min="1" max="5" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            <select class="course-grade" style="padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                <option value="4">A (4.0)</option>
                <option value="3.5">A- (3.5)</option>
                <option value="3">B (3.0)</option>
                <option value="2.5">B- (2.5)</option>
                <option value="2">C (2.0)</option>
                <option value="1.5">C- (1.5)</option>
                <option value="1">D (1.0)</option>
                <option value="0">F (0.0)</option>
            </select>
        `;
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
        
        // Set exam date (example: 2 months from now)
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
                <h3 style="margin: 0 0 15px 0;">
                    ⏳ Final Exams Countdown
                </h3>
                
                <div id="countdown-timer" style="
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    margin: 20px 0;
                ">
                    <div class="countdown-unit" style="
                        background: rgba(255, 255, 255, 0.2);
                        padding: 15px;
                        border-radius: 10px;
                    ">
                        <div id="days" style="font-size: 2em; font-weight: bold;">00</div>
                        <div style="font-size: 0.9em;">Days</div>
                    </div>
                    
                    <div class="countdown-unit" style="
                        background: rgba(255, 255, 255, 0.2);
                        padding: 15px;
                        border-radius: 10px;
                    ">
                        <div id="hours" style="font-size: 2em; font-weight: bold;">00</div>
                        <div style="font-size: 0.9em;">Hours</div>
                    </div>
                    
                    <div class="countdown-unit" style="
                        background: rgba(255, 255, 255, 0.2);
                        padding: 15px;
                        border-radius: 10px;
                    ">
                        <div id="minutes" style="font-size: 2em; font-weight: bold;">00</div>
                        <div style="font-size: 0.9em;">Minutes</div>
                    </div>
                    
                    <div class="countdown-unit" style="
                        background: rgba(255, 255, 255, 0.2);
                        padding: 15px;
                        border-radius: 10px;
                    ">
                        <div id="seconds" style="font-size: 2em; font-weight: bold;">00</div>
                        <div style="font-size: 0.9em;">Seconds</div>
                    </div>
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
        
        // Start countdown timer
        updateCountdown(examDate);
        setInterval(() => updateCountdown(examDate), 1000);
    }
    
    function updateCountdown(examDate) {
        const now = new Date().getTime();
        const timeRemaining = examDate - now;
        
        if (timeRemaining > 0) {
            const days = Math.floor(timeRemaining / (2000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (100 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (100 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (100 * 60)) / 1000);
            
            // Update display
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
    }
    
    // ========== INTERACTIVE QUIZ FOR FRESHMEN ==========
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
                    🧠 general Quiz: Ethiopian  Higher Education Edition
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
                        which Ethiopian university is well known in its technology departments?
                    </div>
                    
                    <div id="quiz-options" style="display: grid; gap: 10px;">
                        <button class="quiz-option" data-correct="false" style="
                            background: white;
                            border: 2px solid #ddd;
                            padding: 15px;
                            border-radius: 10px;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">Addis Ababa University</button>
                        
                        <button class="quiz-option" data-correct="true" style="
                            background: white;
                            border: 2px solid #ddd;
                            padding: 15px;
                            border-radius: 10px;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">Bahir Dar University</button>
                        
                        <button class="quiz-option" data-correct="false" style="
                            background: white;
                            border: 2px solid #ddd;
                            padding: 15px;
                            border-radius: 10px;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.3s;
                        ">Gondar university</button>
                        
                        <button class="quiz-option" data-correct="false" style="
                            background: white;
                            border: 2px solid #ddd;
                            padding: 15px;
                            border-radius: 10px;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.3s;
                        "> Jimma university</button>
                    </div>
                </div>
                
                <div id="quiz-result" style="
                    padding: 15px;
                    border-radius: 10px;
                    margin-top: 20px;
                    text-align: center;
                    display: none;
                ">
                    <!-- Result will be shown here -->
                </div>
                
                <button id="next-quiz" style="
                    background: #4c6ef5;
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
                    Next Question →
                </button>
                
                <p style="text-align: center; margin-top: 15px; color: #666; font-size: 0.9em;">
                    Daily quizzes available on our Telegram channel!
                </p>
            </div>
        `;
        
        ctaSection.parentNode.insertBefore(quizDiv, ctaSection.nextSibling);
        
        // Add quiz functionality
        const quizOptions = document.querySelectorAll('.quiz-option');
        const quizResult = document.getElementById('quiz-result');
        const nextQuizBtn = document.getElementById('next-quiz');
        
        let currentQuestion = 0;
        const questions = [
            {
                question: "Which Ethiopian university is well known in its technology departments?",
                options: ["Addis Ababa University", "Bahir Dar University", "Gondar University", "unlisted"],
                correct: 1
            },
            {
                question: "Which subject has 5 credit hours in most Ethiopian universities?",
                options: ["Communicative English", "Logic and Philosophy", "Mathematics", "All of the above"],
                correct: 2
            },
            {
                question: "What does 'A' grade represent in Ethiopian grading system?",
                options: ["80-89%", "85-94%", "90-100%", "95-100%"],
                correct: 2
            }
        ];
        
        quizOptions.forEach(option => {
            option.addEventListener('click', function() {
                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                // Show result
                quizResult.style.display = 'block';
                
                if (isCorrect) {
                    quizResult.innerHTML = `
                        <div style="
                            background: #d4edda;
                            color: #155724;
                            padding: 15px;
                            border-radius: 10px;
                            border-left: 5px solid #28a745;
                        ">
                            <span style="font-size: 1.5em;">✅</span>
                            <strong>Correct!</strong> በጣም ጥሩ!
                            <p style="margin: 10px 0 0 0; font-size: 0.9em;">
                                Excellent! You know your university system well!
                            </p>
                        </div>
                    `;
                    
                    // Highlight correct answer
                    this.style.background = '#d4edda';
                    this.style.borderColor = '#28a745';
                    this.style.color = '#155724';
                } else {
                    quizResult.innerHTML = `
                        <div style="
                            background: #f8d7da;
                            color: #721c24;
                            padding: 15px;
                            border-radius: 10px;
                            border-left: 5px solid #dc3545;
                        ">
                            <span style="font-size: 1.5em;">❌</span>
                            <strong>Not quite right.</strong> try again! please.
                            <p style="margin: 10px 0 0 0; font-size: 0.9em;">
                                The correct answer is highlighted in green.
                            </p>
                        </div>
                    `;
                    
                    // Highlight wrong answer
                    this.style.background = '#f8d7da';
                    this.style.borderColor = '#dc3545';
                    this.style.color = '#721c24';
                    
                    // Highlight correct answer
                    quizOptions.forEach(opt => {
                        if (opt.getAttribute('data-correct') === 'true') {
                            opt.style.background = '#d4edda';
                            opt.style.borderColor = '#28a745';
                            opt.style.color = '#155724';
                        }
                    });
                }
                
                // Disable all options after selection
                quizOptions.forEach(opt => {
                    opt.style.pointerEvents = 'none';
                });
            });
        });
        
        nextQuizBtn.addEventListener('click', function() {
            currentQuestion = (currentQuestion + 1) % questions.length;
            loadQuestion(currentQuestion);
        });
        
        function loadQuestion(index) {
            const question = questions[index];
            const quizQuestion = document.getElementById('quiz-question');
            const quizOptions = document.querySelectorAll('.quiz-option');
            
            quizQuestion.textContent = question.question;
            
            quizOptions.forEach((option, i) => {
                option.textContent = question.options[i];
                option.setAttribute('data-correct', i === question.correct ? 'true' : 'false');
                
                // Reset styles
                option.style.background = 'white';
                option.style.borderColor = '#ddd';
                option.style.color = '#333';
                option.style.pointerEvents = 'auto';
            });
            
            // Hide result
            quizResult.style.display = 'none';
        }
    }
    
    // ========== ANIMATIONS AND EFFECTS ==========
    function addAnimations() {
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.02); }
                100% { transform: scale(1); }
            }
            
            .success-message, .error-messages, .ethiopian-welcome {
                animation: fadeIn 0.5s ease;
            }
            
            .platform-card:hover {
                transform: translateY(-5px);
                transition: transform 0.3s ease;
            }
            
            .study-day:hover {
                transform: translateY(-3px);
                transition: transform 0.3s ease;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .quiz-option:hover {
                transform: translateX(5px);
                border-color: #4c6ef5 !important;
            }
        `;
        document.head.appendChild(style);
        
        // Add scroll animations
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                header.style.padding = '20px';
            } else {
                header.style.boxShadow = 'none';
                header.style.padding = '40px 20px';
            }
        });
        
        // Add greeting based on time of day
        addTimeBasedGreeting();
    }
    
    function addTimeBasedGreeting() {
        const hours = new Date().getHours();
        let greeting = '';
        
        if (hours < 12) {
            greeting = 'Good Morning!';
        } else if (hours < 18) {
            greeting = 'Good Afternoon! ';
        } else {
            greeting = 'Good Evening!';
        }
        
        // Add greeting to header
        const header = document.querySelector('header');
        const greetingDiv = document.createElement('div');
        greetingDiv.style.cssText = `
            margin-top: 10px;
            font-size: 1rem;
            font-weight: normal;
            opacity: 0.9;
            animation: fadeIn 1s ease;
        `;
        greetingDiv.textContent = greeting;
        header.appendChild(greetingDiv);
    }
});

// ========== ADDITIONAL GLOBAL FUNCTIONS ==========
// These can be called from anywhere

// Function to share website on social media
function shareOnSocialMedia(platform) {
    const url = window.location.href;
    const text = 'Check out Aplus Academy - Best online learning for Ethiopian university freshmen!';
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Function to switch language (for future implementation)
function switchLanguage(lang) {
    // This would be implemented with i18n in a real application
    console.log(`Switching to ${lang} language`);
    
    if (lang === 'am') {
        // Amharic content would be loaded here
        showNotification('Amharic content coming soon!');
    } else if (lang === 'en') {
        // English content
        showNotification('English content loaded');
    }
}

// Function to simulate downloading a resource
function downloadResource(resourceName) {
    console.log(`Downloading: ${resourceName}`);
    showNotification(`Downloading ${resourceName}...`);
    
    // Simulate download delay
    setTimeout(() => {
        showNotification(`${resourceName} downloaded successfully!`);
    }, 2000);
}

// Initialize when page loads
window.addEventListener('load', function() {
    console.log('Aplus Academy - Online Learning Platform Loaded');
    console.log('Empowering Ethiopian University Freshmen Since 2017');
    
    // Add language switcher button (for future implementation)
    addLanguageSwitcher();
});

function addLanguageSwitcher() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const languageDiv = document.createElement('div');
    languageDiv.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
    `;
    
    languageDiv.innerHTML = `
        <button onclick="switchLanguage('en')" style="
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9em;
        ">EN</button>
        
        <button onclick="switchLanguage('am')" style="
            background: rgba(255,255,255,0.2);
            border: 1px solid rgba(255,255,255,0.3);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9em;
        ">Am</button>
    `;
    
    header.style.position = 'relative';
    header.appendChild(languageDiv);
}

// Export functions for global use (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        shareOnSocialMedia,
        switchLanguage,
        downloadResource
    };
}
