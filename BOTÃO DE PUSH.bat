@echo off
chcp 65001 >nul
title BOTAO DE PUSH - htmlcm
cd /d "%~dp0"

echo ============================================
echo   Enviando suas alteracoes para o GitHub...
echo ============================================
echo.

git add -A
git commit -m "Atualizacao via BOTAO DE PUSH - %date% %time%"
if errorlevel 1 (
    echo.
    echo (Nenhuma alteracao nova para commitar - seguindo para o push...)
)

echo.
echo Enviando para o GitHub (branch main)...
echo.
git push origin main

if errorlevel 1 (
    echo.
    echo ============================================
    echo   ERRO ao enviar. Veja a mensagem acima.
    echo   Dica: se pedir login, faca o login do GitHub
    echo   que vai aparecer numa janela do navegador.
    echo ============================================
) else (
    echo.
    echo ============================================
    echo   Sucesso! Seus arquivos foram atualizados
    echo   no GitHub.
    echo ============================================
)

echo.
pause
